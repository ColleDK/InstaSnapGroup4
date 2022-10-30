package service

import db.model.User
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.QueryParam
import service.exceptions.NoImplementationException

@Path("users")
class AuthUserService {

    @GET
    @Path("query")
    fun queryUsers(@QueryParam("name") name: String?): List<User> {
        throw NoImplementationException("user-queries not implemented yet!")
    }

}