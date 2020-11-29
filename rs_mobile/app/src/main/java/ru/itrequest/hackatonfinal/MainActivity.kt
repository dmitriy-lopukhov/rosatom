package ru.itrequest.hackatonfinal

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.ui.platform.setContent
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.room.Room

@Suppress("DEPRECATION")
class MainActivity : AppCompatActivity() {

    private val db by lazy {
        Room.databaseBuilder(
            applicationContext,
            AppDatabase::class.java, "database"
        ).build()
    }
    private val viewModel: MainViewModel by viewModels {
        MyViewModelFactory(db.taskDao(), db.employeeDao()) }

    companion object {
        const val PERMISSIONS_REQUEST_RECORD_AUDIO = 1
    }

    @ExperimentalMaterialApi
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            RossAtomTheme(false) {
                val navController = rememberNavController()
                NavHost(navController, startDestination = "login") {
                    composable("login") { LoginUi(navController, viewModel) }
                    composable("tasks") { MainUi(navController, viewModel) }
                    composable("task") { TaskUi(navController, viewModel) }
                    composable("newTask") { NewTaskUi(navController, viewModel) }
                }
            }
        }
        val permissionCheck =
            ContextCompat.checkSelfPermission(applicationContext, Manifest.permission.RECORD_AUDIO)
        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.RECORD_AUDIO),
                PERMISSIONS_REQUEST_RECORD_AUDIO
            )
            return
        }
        setup()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        when (requestCode) {
            PERMISSIONS_REQUEST_RECORD_AUDIO -> {
                if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    setup()
                } else {
                    Toast.makeText(this, "Permission denied to record voice", Toast.LENGTH_SHORT)
                        .show()
                }
            }
            else -> super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        }
    }

    private fun setup() {
        viewModel.setup(applicationContext)
    }
}
