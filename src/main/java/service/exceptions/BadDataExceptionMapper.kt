package service.exceptions

import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class BadDataExceptionMapper: ExceptionMapper<BadDataException> {
    override fun toResponse(e: BadDataException): Response {
        return Response.status(Response.Status.BAD_REQUEST).entity(e.message).build()
    }

}