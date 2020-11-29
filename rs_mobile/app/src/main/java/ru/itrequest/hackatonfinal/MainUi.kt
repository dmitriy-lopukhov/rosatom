package ru.itrequest.hackatonfinal

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumnFor
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.gesture.tapGestureFilter
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.navigate

@Composable
fun MainUi(navController: NavHostController, viewModel: MainViewModel) {
    Scaffold(
        topBar = { toolBar() },
        bottomBar = { bottomBar() },
        floatingActionButton = {
            fabButton(onClick = { onFabClick(navController) })
        },
        floatingActionButtonPosition = FabPosition.End,
        isFloatingActionButtonDocked = true
    ) {
        tasksUi(navController = navController, viewModel = viewModel)
    }
}

@Composable
fun tasksUi(navController: NavHostController, viewModel: MainViewModel) {
    val tasks by viewModel.tasks.observeAsState()
    LazyColumnFor(
        items = tasks ?: emptyList(),
        contentPadding = PaddingValues(16.dp)
    ) {
        val modifier = Modifier.fillParentMaxWidth()
        taskElementView(
            item = it,
            modifier = modifier,
            onClick = { task -> taskSelected(task, navController, viewModel) })
        if (tasks!!.size - 1 == tasks!!.lastIndexOf(it)) {
            Box(modifier = Modifier.size(64.dp))
        }
    }
}

@Composable
private fun taskElementView(
    item: LinkedTasks,
    modifier: Modifier = Modifier,
    onClick: (LinkedTasks) -> Unit) {
    val md = Modifier.tapGestureFilter {
        onClick(item)
    }.then(modifier)
    Card(modifier = md, elevation = 4.dp) {
        briefTaskUi(fullTaskInfo = item)
    }
    Spacer(modifier = Modifier.preferredHeight(8.dp))
}

fun getTaskColor(prior: TaskPrior): Color {
    return when (prior) {
        TaskPrior.HIGH -> Color.Red
        TaskPrior.MEDIUM -> Color.Green
        TaskPrior.LOW -> Color.Blue
        TaskPrior.NOT_ESTIMATED -> Color.Unspecified
    }
}

fun taskSelected(task: LinkedTasks,
                         navController: NavHostController,
                         viewModel: MainViewModel) {
    navController.navigate("task")
    viewModel.taskSelected(task)
}