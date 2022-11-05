package service

import db.HibernateController
import db.mapToLocal
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import service.exceptions.BadDataException
import service.exceptions.BadPasswordLengthException
import service.models.CreateUserRemote
import kotlin.math.sign


@Path("signup")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class SignupService {
    private val sessionFactory = HibernateController.init("pgtest-db.instasnap.diplomportal.dk:6543/pg")

    @POST
    fun postSignupData(signupData: CreateUserRemote) {
        println("Signup data $signupData")
        when {
            signupData.email.isEmpty() -> {
                throw BadDataException("Email is not provided")
            }
            signupData.password.isEmpty() -> {
                throw BadDataException("Password is not provided")
            }
            signupData.password.length < LoginService.MINIMUM_PASSWORD_LENGTH -> {
                throw BadPasswordLengthException("Password should be at least ${LoginService.MINIMUM_PASSWORD_LENGTH} characters")
            }
            signupData.name.isEmpty() -> {
                throw BadDataException("Name is not provided")
            }
        }

        val session = sessionFactory.openSession()
        val transaction = session.beginTransaction()
        session.persist(signupData.mapToLocal())
        transaction.commit()

        // Simple check for email being formatted correct
//        EMAIL_REGEX.find(signupData.email)?.let {
//            sessionFactory.openSession().persist(signupData.mapToLocal())
//        } ?: run {
//            throw BadDataException("Email is not in correct format")
//        }
    }

    companion object {
        val EMAIL_REGEX = "[\\w\\d]+@[\\w\\d]+.(dk|com|org|edu)}".toRegex()
    }
}