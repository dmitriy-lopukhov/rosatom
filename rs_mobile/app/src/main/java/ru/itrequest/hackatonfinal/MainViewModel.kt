package ru.itrequest.hackatonfinal

import android.content.Context
import androidx.lifecycle.*
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.kaldi.*
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*

class MainViewModel(
    private val taskDao: TaskDao,
    private val employeeDao: EmployeeDao
) : ViewModel(), RecognitionListener {

    private lateinit var model: Model
    private lateinit var speechService: SpeechService
    private lateinit var kaldi: KaldiRecognizer
    private val api = RetrofitBuilder.apiService

    private val jsonAdapter by lazy {
        val moshi = Moshi
            .Builder()
            .add(KotlinJsonAdapterFactory())
            .build()
        moshi.adapter(VoskPartial::class.java)
    }

    val tasks: LiveData<List<LinkedTasks>> = liveData {
        taskDao.getAll().collect { tasks ->
            emit(tasks)
        }
    }

    val employee: LiveData<List<EmployeeEntity>> = liveData {
        employeeDao.getAll().collect { empls ->
            emit(empls)
        }
    }

    private val _selectedTask = MutableLiveData<LinkedTasks>()
    val selectedTask: LiveData<LinkedTasks>
        get() = _selectedTask

    private val _rec = MutableLiveData("")
    val rec: LiveData<String>
        get() = _rec

    private fun processResult(hypothesis: String?) {
        if (hypothesis == null) return
        viewModelScope.launch {
            val result = withContext(Dispatchers.IO) {
                jsonAdapter.fromJson(hypothesis)
            } ?: return@launch
            _rec.value = result.partial
        }
    }

    fun taskSelected(task: LinkedTasks) {
        _selectedTask.value = task
    }

    fun setup(applicationContext: Context?) {
        CoroutineScope(Dispatchers.IO).launch {
            val assets = Assets(applicationContext)
            val assetDir = assets.syncAssets()
            Vosk.SetLogLevel(0)
            model = Model("$assetDir/model-android")
            kaldi = KaldiRecognizer(model, 16000.0f)
            speechService = SpeechService(kaldi, 16000.0f)
            speechService.addListener(this@MainViewModel)
            val tasks = api.getTasks().map {
                TaskEntity(
                    id = it.id,
                    caption = it.caption,
                    author = it.author,
                    executor = it.executor,
                    status = getTaskStatus(it.status),
                    prior = getPrior(it.prior),
                    taskType = getTaskType(it.taskType),
                    description = it.description,
                    deadline = Date.from(it.deadline?.atZone(ZoneId.systemDefault())?.toInstant()),
                    isFavor = false,
                    creationDate = Date.from(
                        it.creationDate.atZone(ZoneId.systemDefault()).toInstant()
                    ),
                    updateDate = Date()
                )
            }
            taskDao.insertAll(tasks)
            val employees = api.getEmployees().map {
                EmployeeEntity(
                    id = it.id,
                    name = it.name,
                    lastname = it.lastname,
                    patronym = it.patronym,
                    position = it.position,
                    created = Date.from(it.created.atZone(ZoneId.systemDefault()).toInstant()),
                    phone = it.phone,
                    orgunit = it.orgunit
                )
            }

            employeeDao.insertAll(employees)
        }
    }

    private fun getTaskType(taskType: Int): TaskType {
        return when (taskType) {
            1 -> TaskType.ORG
            2 -> TaskType.PROD
            3 -> TaskType.TECH
            else -> TaskType.ORG
        }
    }

    private fun getPrior(prior: Int): TaskPrior {
        return when (prior) {
            1 -> TaskPrior.HIGH
            2 -> TaskPrior.MEDIUM
            3 -> TaskPrior.LOW
            else -> TaskPrior.NOT_ESTIMATED
        }
    }

    private fun getTaskStatus(status: Int): TaskStatus {
        return when (status) {
            1 -> TaskStatus.DONE
            2 -> TaskStatus.TODO
            3 -> TaskStatus.FREEZE
            else -> TaskStatus.UNKNOWN
        }
    }

    override fun onPartialResult(p0: String?) {
        processResult(p0)
    }

    override fun onResult(p0: String?) {
//        processResult(p0)
    }

    override fun onError(p0: Exception?) {
        throw p0 ?: Exception("onError")
    }

    override fun onTimeout() {
        // NOOP
    }

    fun addTask(task: TaskEntity) {
        viewModelScope.launch {
            withContext(Dispatchers.IO) {
                val newTask = TaskView(
                    id = task.id,
                    caption = task.caption,
                    author = task.author,
                    executor = task.executor ?: -1,
                    status = when (task.status) {
                        TaskStatus.DONE -> 1
                        TaskStatus.TODO -> 2
                        TaskStatus.FREEZE -> 3
                        else -> 0
                    },
                    prior = when (task.prior) {
                        TaskPrior.HIGH -> 1
                        TaskPrior.MEDIUM -> 2
                        TaskPrior.LOW -> 3
                        TaskPrior.NOT_ESTIMATED -> 4
                    },
                    taskType = when (task.taskType) {
                        TaskType.ORG -> 1
                        TaskType.PROD -> 2
                        TaskType.TECH -> 3
                    },
                    description = task.description,
                    deadline = LocalDateTime.now(),
                    creationDate = LocalDateTime.now()
                )
                val taskView = api.addTask(newTask)
                val tsk = TaskEntity(
                    id = taskView.id,
                    caption = taskView.caption,
                    author = taskView.author,
                    executor = taskView.executor,
                    status = getTaskStatus(taskView.status),
                    prior = getPrior(taskView.prior),
                    taskType = getTaskType(taskView.taskType),
                    description = taskView.description,
                    deadline = Date.from(taskView.deadline.atZone(ZoneId.systemDefault())?.toInstant()),
                    isFavor = false,
                    creationDate = Date.from(
                        taskView.creationDate.atZone(ZoneId.systemDefault()).toInstant()
                    ),
                    updateDate = Date()
                )
                taskDao.insertAll(tsk)
            }
        }
    }

    fun record() {
        _rec.value = ""
        speechService.startListening()
    }

    fun stopRecord() {
        speechService.stop()
    }
}

class MyViewModelFactory(private val taskDao: TaskDao, private val employeeDao: EmployeeDao) :
    ViewModelProvider.Factory {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return MainViewModel(taskDao, employeeDao) as T
    }

}