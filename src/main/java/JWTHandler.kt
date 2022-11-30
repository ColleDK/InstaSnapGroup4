import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTDecodeException
import com.auth0.jwt.exceptions.SignatureVerificationException
import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import service.exceptions.NotAuthorizedException
import service.models.LoginRemote
import service.models.UserRemote
import java.util.*

class JWTHandler {
    fun generateJwtToken(user: UserRemote, key: String = System.getenv(InstasnapKeys.SECRET_KEY)): String {
        val expiry = Calendar.getInstance().apply {
            add(Calendar.MINUTE, TOKEN_EXPIRY)
        }
        val objectMapper = ObjectMapper()

        try {
            val s = objectMapper.writer().writeValueAsString(user)
            return JWT.create()
                .withIssuer(System.getenv(InstasnapKeys.ISSUER))
                .withClaim("user", s)
                .withExpiresAt(expiry.time)
                .sign(Algorithm.HMAC512(key))
        } catch (e: JsonProcessingException) {
            throw RuntimeException(e)
        }
    }

    fun validateUser(s: String, key: String = System.getenv(InstasnapKeys.SECRET_KEY)): UserRemote {
        val verifier = JWT.require(Algorithm.HMAC512(key)).build()
        try {
            val verify = verifier.verify(s)
            val user = verify.getClaim("user")

            try {
                return ObjectMapper().reader().forType(UserRemote::class.java).readValue(user.asString())
            } catch (e: JsonProcessingException) {
                throw RuntimeException(e)
            }
        } catch (e: SignatureVerificationException){
            throw NotAuthorizedException("Not authorized")
        } catch (e: JWTDecodeException){
            throw NotAuthorizedException("Not authorized")
        }
    }

    companion object {
        const val TOKEN_EXPIRY = 2880 // 2 days
    }
}