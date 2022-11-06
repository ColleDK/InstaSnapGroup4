package service

import db.HibernateController
import db.mapToLocal
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import org.apache.commons.validator.routines.EmailValidator
import org.hibernate.SessionFactory
import service.exceptions.BadDataException
import service.exceptions.BadPasswordLengthException
import service.models.CreateUserRemote
import kotlin.math.sign


@Path("signup")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class SignupService(private val sessionFactory: SessionFactory = HibernateController.init("pgtest-db.instasnap.diplomportal.dk:6543/pg")) {

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


        // Simple check for email being formatted correct
        when(EmailValidator.getInstance().isValid(signupData.email)){
            true -> {
                val session = sessionFactory.openSession()
                val transaction = session.beginTransaction()
                session.persist(signupData.mapToLocal())
                transaction.commit()
            }
            false -> {
                println("Email ${signupData.email} is not valid")
                throw BadDataException("Email is not in correct format")
            }
        }
    }
}