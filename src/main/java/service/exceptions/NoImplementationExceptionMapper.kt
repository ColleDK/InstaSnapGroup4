package service.exceptions

import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class NoImplementationExceptionMapper: ExceptionMapper<NoImplementationException> {
    override fun toResponse(e: NoImplementationException): Response {
        return Response.status(Response.Status.NOT_IMPLEMENTED).entity(e.message).build()
    }

}