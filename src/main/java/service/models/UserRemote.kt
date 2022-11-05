package service.models

import java.util.Date

data class UserRemote(
    val name: String = "",
    val email: String = "",
    val birthday: Long = Date().time
)
