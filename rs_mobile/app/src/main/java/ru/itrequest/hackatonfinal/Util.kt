package ru.itrequest.hackatonfinal

import java.text.SimpleDateFormat
import java.util.*

fun Date.print(pattern: String = "dd-MM-yyyy"): String {
    val format = SimpleDateFormat(pattern, Locale.getDefault())
    return format.format(this)
}