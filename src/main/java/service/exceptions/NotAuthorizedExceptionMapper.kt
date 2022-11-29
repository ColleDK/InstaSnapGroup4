package service.exceptions

import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class NotAuthorizedExceptionMapper: ExceptionMapper<NotAuthorizedException> {
    override fun toResponse(e: NotAuthorizedException): Response {
        return Response.status(Response.Status.UNAUTHORIZED).entity(e.message).build()
    }

}