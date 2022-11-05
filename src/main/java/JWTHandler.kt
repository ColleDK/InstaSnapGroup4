import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import service.models.LoginRemote
import java.util.*

class JWTHandler {

    fun generateJwtToken(loginData: LoginRemote): String {
        val expiry = Calendar.getInstance().apply {
            add(Calendar.MINUTE, TOKEN_EXPIRY)
        }
        val objectMapper = ObjectMapper()

        try {
            val s = objectMapper.writer().writeValueAsString(loginData)
            return JWT.create()
                .withIssuer(System.getenv(InstasnapKeys.ISSUER))
                .withClaim("user", s)
                .withExpiresAt(expiry.time)
                .sign(Algorithm.HMAC512(System.getenv(InstasnapKeys.SECRET_KEY)))
        } catch (e: JsonProcessingException) {
            throw RuntimeException(e)
        }
    }

    fun validateUser(s: String): LoginRemote {
        val verifier = JWT.require(Algorithm.HMAC512(System.getenv(InstasnapKeys.SECRET_KEY))).build()
        val verify = verifier.verify(s)

        val user = verify.getClaim("user")

        try {
            return ObjectMapper().reader().forType(LoginRemote::class.java).readValue(user.asString())
        } catch (e: JsonProcessingException) {
            throw RuntimeException(e)
        }

    }

    companion object {
        const val TOKEN_EXPIRY = 2880 // 2 days
    }
}