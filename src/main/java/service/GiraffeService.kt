package service

import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType

@Produces(MediaType.APPLICATION_JSON)
@Path("giraffes")
class GiraffeService {
    private val giraffes = listOf("Melman", "Elmer", "Bob")

    @GET
    fun getGiraffes(): List<String> = giraffes

}