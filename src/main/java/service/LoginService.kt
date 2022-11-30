package service

import JWTHandler
import db.HibernateController
import db.mapToRemote
import db.model.User
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import org.mindrot.jbcrypt.BCrypt
import service.exceptions.BadDataException
import service.exceptions.BadPasswordLengthException
import service.exceptions.NotAuthorizedException
import service.models.LoginRemote
import service.models.UserRemote

@Path("login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class LoginService {
    private val sessionFactory = HibernateController.init("pgtest-db.instasnap.diplomportal.dk:6543/pg")

    @POST
    fun postLoginData(loginData: LoginRemote): String {
        when {
            loginData.email.isEmpty() -> {
                throw BadDataException("Email is not provided")
            }
            loginData.password.isEmpty() -> {
                throw BadDataException("Password is not provided")
            }
            loginData.password.length < MINIMUM_PASSWORD_LENGTH -> {
                throw BadPasswordLengthException("Password should be at least $MINIMUM_PASSWORD_LENGTH characters")
            }
        }

        sessionFactory.openSession().let { session ->
            val query = session.criteriaBuilder.createQuery(User::class.java).apply {
                from(User::class.java)
            }

            session.createQuery(query).resultList.firstOrNull { it.email == loginData.email && BCrypt.checkpw(loginData.password, it.hashedPassword) }?.let {
                return JWTHandler().generateJwtToken(it.mapToRemote()).also { session.close() }
            } ?: run {
                throw NotAuthorizedException("Not authorized")
            }
        }
    }

    @POST
    @Path("validate")
    fun validateToken(token: String): UserRemote {
        return JWTHandler().validateUser(token)
    }

    companion object {
        const val MINIMUM_PASSWORD_LENGTH = 6
    }
}