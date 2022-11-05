package db.model

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "INSTASNAPUSER")
data class User(
    @Id
    @Column(name = "email")
    var email: String = "",
    @Column(name = "name")
    var name: String = "",
    @Column(name = "hashed_password")
    var hashedPassword: String = "",
    @Column(name = "birthday")
    var birthday: Long = Date().time
)
