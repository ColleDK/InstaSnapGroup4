package service

import JWTHandler
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import service.exceptions.NotAuthorizedException
import service.models.UserRemote

@Path("users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class UserService {
    @GET
    fun getCurrentUser(@HeaderParam("Authorization") authHeader: String): UserRemote{
        try {
            return JWTHandler().validateUser(authHeader)
        } catch (e: NotAuthorizedException) {
            throw e
        }
    }
}