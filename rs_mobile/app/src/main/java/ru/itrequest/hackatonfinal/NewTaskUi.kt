package ru.itrequest.hackatonfinal

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumnFor
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.gesture.tapGestureFilter
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.vanpra.composematerialdialogs.MaterialDialog
import com.vanpra.composematerialdialogs.datetime.datetimepicker
import java.time.ZoneId
import java.util.*

@ExperimentalMaterialApi
@Composable
fun NewTaskUi(navController: NavHostController, viewModel: MainViewModel) {
    val newTask = TaskFields()
    Scaffold(
        topBar = { toolBar("Новая задача") },
        floatingActionButton = {
            recordFabButton(onClick = { addNewTask(newTask, viewModel, navController) })
        },
        floatingActionButtonPosition = FabPosition.End,
        isFloatingActionButtonDocked = true
    ) {
        newTask(viewModel, newTask)
    }
}

private fun addNewTask(
    newTask: TaskFields,
    viewModel: MainViewModel,
    navController: NavHostController
) {
    viewModel.addTask(newTask.toEntity())
    navController.popBackStack()
}

@ExperimentalMaterialApi
@Composable
fun newTask(viewModel: MainViewModel, newTask: TaskFields) {
    val dateTime = mutableStateOf(Date())
    val dialog = MaterialDialog()
    dialog.build {
        datetimepicker(title = "Дата и время") { date ->
            dateTime.value = Date.from(date.atZone(ZoneId.systemDefault()).toInstant())
        }
    }
    val state = rememberModalBottomSheetState(ModalBottomSheetValue.Hidden)
    val users by viewModel.employee.observeAsState()
    val userLabel = mutableStateOf("Выбирете ответственного")
    val priorLabel = mutableStateOf("Выбирете приоритет")
    val taskTypeLabel = mutableStateOf("Выбирете тип задачи")
    val spinnerState = mutableStateOf(0)
    ModalBottomSheetLayout(
        sheetState = state,
        sheetContent = {
            when (spinnerState.value) {
                1 -> employeeSpinner(users, newTask.executor, state, userLabel)
                2 -> priorSpinner(
                    priors = listOf(TaskPrior.HIGH, TaskPrior.MEDIUM, TaskPrior.LOW),
                    prior = newTask.prior, state = state, priorLabel = priorLabel
                )
                3 -> typeSpinner(
                    types = listOf(TaskType.ORG, TaskType.TECH, TaskType.PROD),
                    type = newTask.taskType, state = state, taskTypeLabel = taskTypeLabel
                )
                else -> Text("NO")
            }
        }
    ) {
        Column(
            modifier = Modifier.fillMaxSize().padding(16.dp),
        ) {
            val tp = MaterialTheme.typography
            val md = Modifier.fillMaxWidth().padding(top = 8.dp)
            Text("Заголовок:", style = tp.caption)
            voiceEditableText(
                state = newTask.caption,
                label = "Введите заголовок",
                modifier = md,
                viewModel = viewModel
            )
            Text("Описание:", style = tp.caption)
            voiceEditableText(
                state = newTask.description,
                label = "Введите описание",
                modifier = md,
                viewModel = viewModel
            )
            Text("Типа задачи:", style = tp.caption)
            Button(onClick = {
                spinnerState.value = 3
                state.show()
            }, modifier = md) {
                Text(text = taskTypeLabel.value)
            }
            Text("Исполнитель:", style = tp.caption)
            Button(onClick = {
                spinnerState.value = 1
                state.show()
            }, modifier = md) {
                Text(text = userLabel.value)
            }
            Text("Приоритет:", style = tp.caption)
            Button(onClick = {
                spinnerState.value = 2
                state.show()
            }, modifier = md) {
                Text(text = priorLabel.value)
            }
            Text("Время и дата крайнего срока:", style = tp.caption)
            Button(onClick = {
                dialog.show()
            }, modifier = md) {
                Text(text = dateTime.value.print("dd-MM-yyyy hh:mm"))
            }
        }
    }
}

@ExperimentalMaterialApi
@Composable
fun employeeSpinner(
    employees: List<EmployeeEntity>?,
    executor: MutableState<EmployeeEntity?>,
    state: ModalBottomSheetState,
    userLabel: MutableState<String>
) {
    LazyColumnFor(
        items = employees ?: emptyList(),
        contentPadding = PaddingValues(16.dp)
    ) {
        val modifier = Modifier.fillParentMaxWidth().then(Modifier.padding(top = 8.dp))
        employeeUi(
            item = it,
            modifier = modifier,
            onClick = {
                executor.value = it
                state.hide()
            },
            userLabel = userLabel
        )
    }
}

@Composable
fun employeeUi(
    item: EmployeeEntity,
    modifier: Modifier = Modifier,
    onClick: () -> Unit,
    userLabel: MutableState<String>
) {
    Button(modifier = modifier, onClick = {
        userLabel.value = "${item.name} ${item.lastname} ${item.patronym}"
        onClick()
    }) {
        Text(text = "${item.name} ${item.lastname} ${item.patronym}")
    }
}

@ExperimentalMaterialApi
@Composable
fun priorSpinner(
    priors: List<TaskPrior>,
    prior: MutableState<TaskPrior>,
    state: ModalBottomSheetState,
    priorLabel: MutableState<String>
) {
    LazyColumnFor(
        items = priors,
        contentPadding = PaddingValues(16.dp)
    ) {
        val modifier = Modifier.fillParentMaxWidth().then(Modifier.padding(top = 8.dp))
        priorUi(
            item = it,
            modifier = modifier,
            onClick = {
                prior.value = it
                state.hide()
            },
            priorLabel = priorLabel
        )
    }
}

@Composable
fun priorUi(
    item: TaskPrior,
    modifier: Modifier = Modifier,
    onClick: () -> Unit,
    priorLabel: MutableState<String>
) {
    Button(modifier = modifier, onClick = {
        priorLabel.value = when (item) {
            TaskPrior.HIGH -> "Высокий"
            TaskPrior.MEDIUM -> "Средний"
            TaskPrior.LOW -> "Низкий"
            TaskPrior.NOT_ESTIMATED -> "Без приоритета"
        }
        onClick()
    }) {
        Text(text = when (item) {
            TaskPrior.HIGH -> "Высокий"
            TaskPrior.MEDIUM -> "Средний"
            TaskPrior.LOW -> "Низкий"
            TaskPrior.NOT_ESTIMATED -> "Без приоритета"
        })
    }
}

@ExperimentalMaterialApi
@Composable
fun typeSpinner(
    types: List<TaskType>,
    type: MutableState<TaskType>,
    state: ModalBottomSheetState,
    taskTypeLabel: MutableState<String>
) {
    LazyColumnFor(
        items = types,
        contentPadding = PaddingValues(16.dp)
    ) {
        val modifier = Modifier.fillParentMaxWidth().then(Modifier.padding(top = 8.dp))
        taskTypeUi(
            item = it,
            modifier = modifier,
            onClick = {
                type.value = it
                state.hide()
            },
            taskTypeLabel = taskTypeLabel
        )
    }
}

@Composable
fun taskTypeUi(
    item: TaskType,
    modifier: Modifier = Modifier,
    onClick: () -> Unit,
    taskTypeLabel: MutableState<String>
) {
    Button(modifier = modifier, onClick = {
        taskTypeLabel.value = when (item) {
            TaskType.ORG -> "Организационная"
            TaskType.TECH -> "Техническая"
            TaskType.PROD -> "Технологическая"
        }
        onClick()
    }) {
        Text(text = when (item) {
            TaskType.ORG -> "Организационная"
            TaskType.TECH -> "Техническая"
            TaskType.PROD -> "Технологическая"
        })
    }
}


@Composable
fun recordFabButton(onClick: () -> Unit) {
    FloatingActionButton(
        onClick = { onClick() }) {
        Icon(vectorResource(R.drawable.ic_baseline_save_24))
    }
}

@Composable
fun voiceEditableText(
    state: MutableState<String>,
    label: String,
    modifier: Modifier = Modifier,
    viewModel: MainViewModel,
) {
    var text by remember { mutableStateOf(TextFieldValue()) }
    val rec = remember { mutableStateOf(false) }
    val recognizedText by viewModel.rec.observeAsState()
    TextField(
        modifier = modifier,
        value = text,
        onValueChange = {
            text = it
            state.value = text.text
        },
        label = { Text(text = label) },
        trailingIcon = {
            if (rec.value) {
                stopRecordIcon(state = rec, viewModel = viewModel)
                text = TextFieldValue(recognizedText!!)
                state.value = recognizedText!!
            } else recordIcon(state = rec, viewModel = viewModel)
        })
}

@Composable
fun recordIcon(state: MutableState<Boolean>, viewModel: MainViewModel) {
    Icon(vectorResource(R.drawable.ic_baseline_keyboard_voice_24),
        modifier = Modifier.tapGestureFilter {
            state.value = true
            viewModel.record()
        })
}

@Composable
fun stopRecordIcon(
    state: MutableState<Boolean>,
    viewModel: MainViewModel,
) {
    Icon(vectorResource(R.drawable.ic_baseline_voice_over_off_24),
        modifier = Modifier.tapGestureFilter {
            state.value = false
            viewModel.stopRecord()
        })
}

data class TaskFields(
    var caption: MutableState<String> = mutableStateOf(""),
    var executor: MutableState<EmployeeEntity?> = mutableStateOf(null),
    var status: TaskStatus = TaskStatus.TODO,
    var prior: MutableState<TaskPrior> = mutableStateOf(TaskPrior.NOT_ESTIMATED),
    var description: MutableState<String> = mutableStateOf(""),
    var taskType: MutableState<TaskType> = mutableStateOf(TaskType.ORG),
    var deadline: Date? = null,
    var creationDate: Date = Date(),
    var updateDate: Date = Date(),
) {
    fun toEntity(): TaskEntity = TaskEntity(
        id = 0, caption = this.caption.value, author = 1, executor = executor.value?.id ?: -1,
        status = this.status, prior = this.prior.value, description = this.description.value,
        deadline = this.deadline, creationDate = this.creationDate, updateDate = this.updateDate,
        taskType = this.taskType.value
    )
}

