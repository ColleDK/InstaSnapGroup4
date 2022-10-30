package service.exceptions

import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class BadPasswordLengthExceptionMapper: ExceptionMapper<NoImplementationException> {
    override fun toResponse(e: NoImplementationException): Response {
        return Response.status(Response.Status.BAD_REQUEST).entity(e.message).build()
    }

}