package ru.itrequest.hackatonfinal

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material.MaterialTheme
import androidx.compose.material.lightColors
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

@Composable
fun RossAtomTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colors = LightColors,
        content = content
    )
}

private val LightColors = lightColors(
    primary = Color(0xff1565c0),
    primaryVariant = Color(0xff5e92f3),
    secondary = Color(0xff003c8f),
    onSecondary = Color(0xffffffff),

)