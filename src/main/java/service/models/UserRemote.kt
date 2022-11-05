package service.models

import java.util.Date

data class UserRemote(
    val firstName: String = "",
    val lastName: String = "",
    val email: String = "",
    val birthday: Date = Date()
)
