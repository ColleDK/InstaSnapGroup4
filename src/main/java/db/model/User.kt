package db.model

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "DBUSER")
data class User(
    @Id
    @GeneratedValue
    @Column(name = "id")
    var id: Int = -1,
    @Column(name = "first_name")
    var firstName: String = "",
    @Column(name = "last_name")
    var lastName: String = "",
    @Column(name = "hashed_password")
    var hashedPassword: String = "",
    @Column(name = "birthday")
    var birthday: Date = Date()
)
