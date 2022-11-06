package login

import JWTHandler
import io.mockk.MockKAnnotations
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.unmockkAll
import org.junit.After
import org.junit.Before
import org.junit.Test
import service.LoginService
import service.exceptions.NotAuthorizedException
import service.models.LoginRemote
import kotlin.test.fail

class LoginServiceTest {

    @MockK
    lateinit var service: LoginService

    @Before
    fun setup() = MockKAnnotations.init(this, relaxUnitFun = true)

    @Test
    fun testLoginFailure(){
        every { service.postLoginData(TEST_DATA) } throws NotAuthorizedException("Not authorized")
        try {
            service.postLoginData(TEST_DATA)
            fail()
        } catch (e: NotAuthorizedException) {
            println("$e")
        }
    }

    @Test
    fun testLoginAndValidationSuccess() {
        every { service.postLoginData(TEST_DATA) } returns JWTHandler().generateJwtToken(loginData = TEST_DATA, key = TEST_SECRET_KEY)

        val token = service.postLoginData(TEST_DATA)

        every { service.validateToken(token = token) } returns JWTHandler().validateUser(s = token, key = TEST_SECRET_KEY)

        service.validateToken(token = token)
    }

    @Test
    fun testLoginAndValidationFailure(){
        every { service.postLoginData(TEST_DATA) } returns JWTHandler().generateJwtToken(loginData = TEST_DATA, key = TEST_SECRET_KEY)

        val token = service.postLoginData(TEST_DATA)
        val malformedToken = token + "extra"

        every { service.validateToken(token = malformedToken) } throws NotAuthorizedException("Not authorized")

        try {
            service.validateToken(token = malformedToken)
            fail()
        } catch (e: NotAuthorizedException) {

        }
    }

    @After
    fun afterTests(){
        unmockkAll()
    }

    companion object {
        val TEST_DATA = LoginRemote("test@gmail.com", "test123456")
        val TEST_SECRET_KEY = "testkey"
    }
}