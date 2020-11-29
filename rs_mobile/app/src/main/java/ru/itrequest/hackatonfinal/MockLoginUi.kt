package ru.itrequest.hackatonfinal

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.navigate

@Composable
fun LoginUi(navController: NavHostController, viewModel: MainViewModel) {
    Scaffold(
        topBar = { toolBar() },
    ) {
        loginScreen(navController = navController, viewModel = viewModel)
    }
}

@Composable
fun loginScreen(navController: NavHostController, viewModel: MainViewModel) {
    Column(
        modifier = Modifier.fillMaxWidth().fillMaxHeight(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        val color = MaterialTheme.colors
        val tp = MaterialTheme.typography
        Box {
            Card(backgroundColor = color.secondary) {
                val verticalPadding = Modifier.padding(top = 8.dp, bottom = 8.dp)
                Column(modifier = Modifier.width(300.dp)
                    .then(Modifier.padding(horizontal = 32.dp, vertical = 16.dp))) {
                    Text(color = color.onSecondary, text = "ВХОД", style = tp.h4)
                    inputField(label = "Логин", modifier = verticalPadding, text = "admin")
                    inputField(label = "Пароль", modifier = verticalPadding,
                        text = "admin", hide = true)
                    Button(modifier = verticalPadding.then(Modifier.fillMaxWidth()),
                        onClick = { navController.navigate("tasks") }) {
                        Text(text = "Вход")
                    }
                }
            }
        }
    }
}

@Composable
fun inputField(label: String, modifier: Modifier = Modifier, text: String, hide: Boolean = false) {
    var text by remember { mutableStateOf(TextFieldValue(text)) }
    val color = MaterialTheme.colors
    TextField(
        backgroundColor = color.onSecondary,
        modifier = modifier,
        value = text,
        visualTransformation =
        if (hide) PasswordVisualTransformation()
        else VisualTransformation.None,
        onValueChange = {
            text = it
            Log.i("TEXTFIELD", it.text)
        },
        label = { Text(text = label) })
}
