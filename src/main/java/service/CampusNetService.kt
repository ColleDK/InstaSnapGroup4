package service

import JWTHandler
import db.HibernateController
import db.mapToRemote
import db.model.User
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.core.UriBuilder
import kong.unirest.Unirest
import org.hibernate.SessionFactory
import service.exceptions.NotAuthorizedException
import service.models.UserRemote
import java.lang.Exception

const val URI = "https://auth.dtu.dk/dtu/?service=https://instasnap.instasnap.diplomportal.dk/api/campusnet/redirect"
const val REDIRECT_URI = "https://instasnap.instasnap.diplomportal.dk/?token="

@Path("campusnet")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class CampusNetService(private val sessionFactory: SessionFactory = HibernateController.init("pgtest-db.instasnap.diplomportal.dk:6543/pg")) {

    @GET
    @Path("login")
    fun login(): Response {
        return Response.seeOther(UriBuilder.fromUri(URI).build()).build()
    }

    @GET
    @Path("redirect")
    fun callback(@QueryParam("ticket") cnTicket: String): Response {
        println(cnTicket)

        val body = Unirest.get("https://auth.dtu.dk/dtu/validate?service=https://instasnap.instasnap.diplomportal.dk/api/campusnet/redirect&ticket=$cnTicket").asString().body
        println("body: $body")
        BODY_SUCCESS_REGEX.find(body)?.destructured?.component1()?.let { id ->
            val user = User(name = id)
            try {
                val session = sessionFactory.openSession()
                val transaction = session.beginTransaction()
                session.persist(user)
                transaction.commit()
            } catch (e: Exception){
                println(e)
            }

            val token = JWTHandler().generateJwtToken(user = user.mapToRemote())
            return Response.seeOther(UriBuilder.fromUri("$REDIRECT_URI$token").build()).build()
        } ?: run {
            throw NotAuthorizedException("Not authorized")
        }
    }

    @GET
    @Path("testtoken")
    fun testToken(@HeaderParam("Authorization") auth: String): UserRemote {
        return JWTHandler().validateUser(s = auth)
    }

    companion object {
        val BODY_SUCCESS_REGEX = "yes\\s+(s\\d{6})".toRegex()
    }

}