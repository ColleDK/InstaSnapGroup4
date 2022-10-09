package service

import jakarta.ws.rs.GET
import jakarta.ws.rs.Path

@Path("hello")
class HelloService {

    @GET
    fun getHello(): String {
        return "Hello Devops-API"
    }
}