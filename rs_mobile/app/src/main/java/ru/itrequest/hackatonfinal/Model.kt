package ru.itrequest.hackatonfinal

import androidx.room.*
import kotlinx.coroutines.flow.Flow
import java.util.*

enum class TaskStatus {
    TODO, DONE, FREEZE, UNKNOWN
}

enum class TaskPrior {
    HIGH, MEDIUM, LOW, NOT_ESTIMATED
}

enum class TaskType {
    ORG, PROD, TECH
}

@Entity(tableName = "tasks")
data class TaskEntity(
    @PrimaryKey(autoGenerate = true) val id: Int,
    val caption: String,
    val author: Int,
    val executor: Int?,
    val status: TaskStatus,
    val prior: TaskPrior,
    val taskType: TaskType,
    val description: String,
    val deadline: Date?,
    val isFavor: Boolean = false,
    val creationDate: Date,
    val updateDate: Date,
)

data class LinkedTasks(
    @Embedded val taskEntity: TaskEntity,
    @Relation(
        parentColumn = "id",
        entityColumn = "fId"
    )
    val links: List<TaskLinkEntity>,
    @Relation(
        parentColumn = "author",
        entityColumn = "id")
    val author: EmployeeEntity,
    @Relation(
        parentColumn = "executor",
        entityColumn = "id")
    val executor: EmployeeEntity?,
)

@Entity(tableName = "task_link", indices = [ Index(value = ["fId", "sId"], unique = true) ])
data class TaskLinkEntity(
    @PrimaryKey(autoGenerate = true) val id: Int,
    val fId: Int,
    val sId: Int
)

class DateConverter {
    @TypeConverter
    fun fromTimestamp(value: Long?): Date? {
        return value?.let { Date(it) }
    }
    @TypeConverter
    fun dateToTimestamp(date: Date?): Long? {
        return date?.time
    }
}

class TaskStatusConverter {
    @TypeConverter
    fun fromInt(value: Int?): TaskStatus? {
        return when (value) {
            1 -> TaskStatus.DONE
            2 -> TaskStatus.TODO
            3 -> TaskStatus.FREEZE
            else -> TaskStatus.UNKNOWN
        }
    }
    @TypeConverter
    fun taskStatusToInt(taskStatus: TaskStatus?): Int? {
        return when (taskStatus) {
            TaskStatus.DONE -> 1
            TaskStatus.TODO -> 2
            TaskStatus.FREEZE -> 3
            else -> 0
        }
    }
}

class TaskPriorConverter {
    @TypeConverter
    fun fromInt(value: Int?): TaskPrior? {
        return when (value) {
            1 -> TaskPrior.HIGH
            2 -> TaskPrior.MEDIUM
            3 -> TaskPrior.LOW
            else -> TaskPrior.NOT_ESTIMATED
        }
    }
    @TypeConverter
    fun taskPriorToInt(taskPrior: TaskPrior?): Int? {
        return when (taskPrior) {
            TaskPrior.HIGH -> 1
            TaskPrior.MEDIUM -> 2
            TaskPrior.LOW -> 3
            else -> 0
        }
    }
}

class TaskTypeConverter {
    @TypeConverter
    fun fromInt(value: Int?): TaskType? {
        return when (value) {
            1 -> TaskType.ORG
            2 -> TaskType.PROD
            3 -> TaskType.TECH
            else -> TaskType.ORG
        }
    }
    @TypeConverter
    fun taskTypeToInt(taskType: TaskType?): Int? {
        return when (taskType) {
            TaskType.ORG -> 1
            TaskType.PROD -> 2
            TaskType.TECH -> 3
            else -> 1
        }
    }
}

@Dao
interface TaskDao {
    @Transaction
    @Query("SELECT * FROM tasks ORDER BY creationDate DESC")
    fun getAll(): Flow<List<LinkedTasks>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(vararg tasks: TaskEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(tasks: List<TaskEntity>)
}

@Dao
interface EmployeeDao {
    @Transaction
    @Query("SELECT * FROM employee ORDER BY id ASC")
    fun getAll(): Flow<List<EmployeeEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(vararg employee: EmployeeEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(employee: List<EmployeeEntity>)
}

@Entity(tableName = "employee")
data class EmployeeEntity(
    @PrimaryKey(autoGenerate = true) val id: Int,
    val name: String,
    val lastname: String,
    val patronym: String,
    val position:String,
    val created: Date,
    val phone:String,
    val orgunit:String
)

@Database(entities = [TaskEntity::class, TaskLinkEntity::class, EmployeeEntity::class], version = 1)
@TypeConverters(DateConverter::class,
    TaskStatusConverter::class, TaskPriorConverter::class, TaskTypeConverter::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun taskDao(): TaskDao
    abstract fun employeeDao(): EmployeeDao
}

data class VoskPartial(
    val partial: String
)

data class VoskWord(
    val conf: Double?,
    val end: Double?,
    val start: Double?,
    val word: String?
)

data class VoskResult(
    val result: List<VoskWord>?,
    val text: String?
)