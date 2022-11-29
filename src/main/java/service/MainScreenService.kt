package service

import JWTHandler
import jakarta.ws.rs.GET
import jakarta.ws.rs.HeaderParam
import jakarta.ws.rs.Path
import service.exceptions.NotAuthorizedException
import service.models.PostRemote

@Path("main")
class MainScreenService {

    @GET
    fun getPosts(@HeaderParam("Authorization") authHeader: String): List<PostRemote>{
        try {
            println("Current auth header $authHeader")
            val currentUser = JWTHandler().validateUser(authHeader)
            println("Current user accessing posts $currentUser")
            return DATA
        } catch (e: NotAuthorizedException) {
            throw e
        }
    }

    companion object {
        val DATA = listOf<PostRemote>(
            PostRemote(),
            PostRemote(),
            PostRemote(),
            PostRemote(),
        )
    }
}