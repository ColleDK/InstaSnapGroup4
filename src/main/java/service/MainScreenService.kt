package service

import JWTHandler
import jakarta.ws.rs.GET
import jakarta.ws.rs.HeaderParam
import jakarta.ws.rs.Path
import service.models.PostRemote

@Path("main")
class MainScreenService {

    @GET
    fun getPosts(@HeaderParam("Authorization") authHeader: String): List<PostRemote> {
        println("Current auth header $authHeader")
        val currentUser = JWTHandler().validateUser(authHeader)
        println("Current user accessing posts $currentUser")
        return DATA
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