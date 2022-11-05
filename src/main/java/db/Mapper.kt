package db

import db.model.User
import org.mindrot.jbcrypt.BCrypt
import service.models.CreateUserRemote
import service.models.UserRemote

fun CreateUserRemote.mapToLocal(): User {
    return User(
        email = email,
        name = name,
        hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt()),
        birthday = birthday
    )
}

fun User.mapToRemote(): UserRemote {
    return UserRemote(
        name = name,
        email = email,
        birthday = birthday
    )
}