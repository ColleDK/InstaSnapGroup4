import jakarta.annotation.Priority
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import jakarta.ws.rs.container.ContainerRequestContext
import jakarta.ws.rs.container.ContainerRequestFilter
import jakarta.ws.rs.core.Context
import jakarta.ws.rs.ext.Provider

@Provider
@Priority(500)
class CORSFilter : ContainerRequestFilter {
    @Context
    private lateinit var request: HttpServletRequest

    @Context
    private lateinit var response: HttpServletResponse

    override fun filter(requestContext: ContainerRequestContext?) {
        response.setHeader("Access-Control-Allow-Origin","*")
        response.setHeader("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS, PATCH")

        val requestAllowHeader = request.getHeader("Access-Control-Request-Headers")

        response.apply {
            setHeader("Access-Control-Allow-Headers", requestAllowHeader)
            setHeader("Access-Control-Allow-Credentials", "true")
            setHeader("Access-Control-Expose-Headers", "Authorization")
            setHeader("encoding", "utf-8")
        }
    }
}