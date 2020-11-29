package ru.itrequest.hackatonfinal

import com.squareup.moshi.JsonAdapter
import com.squareup.moshi.JsonReader
import com.squareup.moshi.JsonWriter
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

data class TaskView(
    val id: Int,
    val caption: String,
    val author: Int,
    val executor: Int,
    val status: Int,
    val prior: Int,
    val taskType: Int,
    val description: String,
    val deadline: LocalDateTime,
    val creationDate: LocalDateTime
)

data class EmployeeView(
    val id: Int,
    val name: String,
    val lastname: String,
    val patronym: String,
    val position:String,
    val created: LocalDateTime,
    val phone:String,
    val orgunit:String
)

interface ApiService {
    @GET("/api/employee")
    suspend fun getEmployees(): List<EmployeeView>

    @POST("/api/issue")
    suspend fun addTask(@Body task: TaskView): TaskView

    @GET("/api/issue")
    suspend fun getTasks(): List<TaskView>

}

object RetrofitBuilder {
    private const val BASE_URL = "http://atom.ecce.icu/"

    private fun getRetrofit(): Retrofit {
        val moshi = Moshi
            .Builder()
            .add(KotlinJsonAdapterFactory())
            .add(LocalDateTime::class.java, LocalDateTimeAdapter().nullSafe())
            .build()
        val interceptor = HttpLoggingInterceptor()
        interceptor.level = HttpLoggingInterceptor.Level.BODY
        val client = OkHttpClient.Builder().addInterceptor(interceptor).build();
        return Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(client)
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .build()
    }

    val apiService: ApiService = getRetrofit().create(ApiService::class.java)
}

class LocalDateTimeAdapter : JsonAdapter<LocalDateTime>(){
    private val formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME
    override fun toJson(writer: JsonWriter, value: LocalDateTime?) {
        value?.let { writer?.value(it.format(formatter)) }
    }

    override fun fromJson(reader: JsonReader): LocalDateTime? {
        return if (reader.peek() != JsonReader.Token.NULL) {
            fromNonNullString(reader.nextString())
        } else {
            reader.nextNull<Any>()
            null
        }    }

    private fun fromNonNullString(nextString: String) :
            LocalDateTime = LocalDateTime.parse(nextString, formatter)
}
