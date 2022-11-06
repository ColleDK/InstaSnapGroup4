package signup

import io.mockk.MockKAnnotations
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.unmockkAll
import org.junit.After
import org.junit.Before
import org.junit.Test
import service.SignupService
import service.exceptions.BadDataException
import service.models.CreateUserRemote
import java.util.*
import kotlin.test.fail

class SignupServiceTest {
    @MockK
    lateinit var service: SignupService

    @Before
    fun setup() = MockKAnnotations.init(this, relaxUnitFun = true)

    @Test
    fun testSignupBadEmail(){
        every { service.postSignupData(BAD_EMAIL_TEST_DATA) } throws BadDataException("")
        try {
            service.postSignupData(BAD_EMAIL_TEST_DATA)
            fail()
        } catch (e: BadDataException){

        }
    }

    @Test
    fun testSignupSuccess(){
        every { service.postSignupData(SUCCESS_TEST_DATA) } returns Unit
        service.postSignupData(SUCCESS_TEST_DATA)
    }

    @After
    fun afterTests(){
        unmockkAll()
    }

    companion object {
        val BAD_EMAIL_TEST_DATA = CreateUserRemote("johnny", "johnnygmail.com", "test123456", Date().time)
        val SUCCESS_TEST_DATA = CreateUserRemote("johnny", "johnny@gmail.com", "test123456", Date().time)
    }
}