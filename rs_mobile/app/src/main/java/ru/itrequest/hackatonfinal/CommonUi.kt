package ru.itrequest.hackatonfinal

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.FirstBaseline
import androidx.compose.ui.layout.HorizontalAlignmentLine
import androidx.compose.ui.res.vectorResource
import androidx.navigation.NavController
import androidx.navigation.compose.navigate
import java.time.format.TextStyle

@Composable
fun toolBar(label: String = "Poсатом") {
    TopAppBar(
        title = { Text(text = label) }
    )
}

@Composable
fun bottomBar() {
//    BottomAppBar(cutoutShape = MaterialTheme.shapes.small.copy(CornerSize(percent = 50))) {
//        Text(text = "подвал")
//    }
}

@Composable
fun fabButton(onClick: () -> Unit) {
    FloatingActionButton(
        onClick = { onClick() }) {
        Icon(vectorResource(R.drawable.ic_baseline_add_24))
    }
}

fun onFabClick(navController: NavController) {
    navController.navigate("newTask")
}

@Composable
fun rowText(label: String, text: String, color: Color? = null) {
    val t = MaterialTheme.typography
    Row {
        Text(text = label, style = t.subtitle2)
        Spacer(modifier = Modifier.weight(1f))
        Text(text = text, style = t.body1, color = color ?: Color.Unspecified)
    }
}



