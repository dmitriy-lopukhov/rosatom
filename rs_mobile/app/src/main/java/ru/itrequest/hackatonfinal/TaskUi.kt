package ru.itrequest.hackatonfinal

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material.*
import androidx.compose.material.MaterialTheme.typography
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController

@Composable
fun TaskUi(navController: NavHostController, viewModel: MainViewModel) {
    val task by viewModel.selectedTask.observeAsState()
    Scaffold(
        topBar = { toolBar("Задача № ${task?.taskEntity?.id ?: -1}") },
        bottomBar = { bottomBar() },
        floatingActionButton = {
            fabEditButton(onClick = { onFabClick(navController) })
        },
        floatingActionButtonPosition = FabPosition.End,
        isFloatingActionButtonDocked = true
    ) {
        task(task = task)
    }
}

@Composable
fun fabEditButton(onClick: () -> Unit) {
    FloatingActionButton(
        onClick = { onClick() }) {
        Icon(vectorResource(R.drawable.ic_baseline_edit_24))
    }
}

@Composable
fun task(task: LinkedTasks?) {
    if (task == null) throw Error("Task is null")
    Column {
        briefTaskUi(fullTaskInfo = task)
        fullTaskUi(fullTaskInfo = task)
    }
}

@Composable
fun briefTaskUi(fullTaskInfo: LinkedTasks) {
    Column(modifier = Modifier.padding(8.dp)) {
        Text(
            text = "№${fullTaskInfo.taskEntity.id}: ${fullTaskInfo.taskEntity.caption}",
            style = typography.h6, maxLines = 1, overflow = TextOverflow.Ellipsis
        )
        if (fullTaskInfo.executor != null) {
            rowText(
                label = "Исполнитель:",
                text = "${fullTaskInfo.executor.name} ${fullTaskInfo.executor.lastname}"
            )
        }
        if (fullTaskInfo.taskEntity.deadline != null) {
            rowText(
                label = "Срок исполнения:",
                text = fullTaskInfo.taskEntity.deadline.print("dd-MM-yyyy hh:mm")
            )
        }
        rowText(
            label = "Тип задачи:",
            text = typeTaskToString(fullTaskInfo.taskEntity.taskType)
        )
        rowText(
            label = "Приоритет",
            text = priorTaskToString(fullTaskInfo.taskEntity.prior),
            color = getTaskColor(fullTaskInfo.taskEntity.prior)
        )
        rowText(label = "Статус задачи", text = taskStatusToString(fullTaskInfo.taskEntity.status))
    }

}

@Composable
fun fullTaskUi(fullTaskInfo: LinkedTasks) {
    val t = typography
    Column(modifier = Modifier.padding(8.dp)) {
        rowText(
            label = "Автор:",
            text = "${fullTaskInfo.author.name} ${fullTaskInfo.author.lastname}"
        )

        rowText(
            label = "Срок создания:",
            text = fullTaskInfo.taskEntity.creationDate.print("dd-MM-yyyy hh:mm")
        )
        Text(text = "Описание:", style = t.subtitle2)
        Text(modifier = Modifier.padding(start = 8.dp), text = fullTaskInfo.taskEntity.description)
    }
}

fun typeTaskToString(taskType: TaskType): String {
    return when (taskType) {
        TaskType.ORG -> "Организационная"
        TaskType.TECH -> "Техническая"
        TaskType.PROD -> "Технологическая"
    }
}

fun priorTaskToString(prior: TaskPrior): String {
    return when (prior) {
        TaskPrior.HIGH -> "Высокий"
        TaskPrior.MEDIUM -> "Средний"
        TaskPrior.LOW -> "Низкий"
        TaskPrior.NOT_ESTIMATED -> "Без приоритета"
    }
}

private fun taskStatusToString(status: TaskStatus): String {
    return when (status) {
        TaskStatus.DONE -> "Выполнено"
        TaskStatus.TODO -> "Сделать"
        TaskStatus.FREEZE -> "На паузе"
        TaskStatus.UNKNOWN -> "Не установлен"
    }
}