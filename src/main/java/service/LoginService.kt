package service

import JWTHandler
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import service.exceptions.BadDataException
import service.exceptions.BadPasswordLengthException
import service.models.LoginRemote

@Path("login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class LoginService {

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

        return JWTHandler().generateJwtToken(loginData = loginData)
    }

    @POST
    @Path("tokentest")
    fun postToken(token: String): LoginRemote {
        return JWTHandler().validateUser(token)
    }

    companion object {
        const val MINIMUM_PASSWORD_LENGTH = 6
    }
}