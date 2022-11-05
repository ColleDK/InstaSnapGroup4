package service.models

import java.util.*

data class CreateUserRemote(
    val name: String = "",
    val email: String = "",
    val password: String = "",
    val birthday: Long = Date().time,
)
