package service

import JWTHandler
import jakarta.annotation.Priority
import jakarta.ws.rs.container.ContainerRequestContext
import jakarta.ws.rs.container.ContainerRequestFilter
import jakarta.ws.rs.ext.Provider

@Provider
@Priority(1000)
class TokenFilter: ContainerRequestFilter {
    override fun filter(request: ContainerRequestContext) {
        when(request.uriInfo.path){
            "login/", "login/validate/", "signup/", "campusnet/login/", "campusnet/redirect/" -> { /* Let the user through so they can login and create a user */ }
            else -> {
                // TODO Figure out why header is not passed here
//                JWTHandler().validateUser(request.getHeaderString("Authorization"))
            }
        }
    }

}