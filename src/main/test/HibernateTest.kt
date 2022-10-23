import db.HibernateController
import db.model.User
import org.junit.Test

class HibernateTest {
    @Test
    fun testCreate(){
        val sessionFactory = HibernateController.init("pgtest-db.instasnap.diplomportal.dk:6543/pg")
        val session = sessionFactory.openSession()
        val transaction = session.beginTransaction()

        val user = User().apply {
            println("UserID before commit $id")
            firstName = "Melman"
            lastName = "Giraffe"
        }
        session.persist(user)
        transaction.commit()

        println("UserID after commit ${user.id}")
        val readTransaction = session.beginTransaction()
        session.get(User::class.java, user.id).let {
            println("Read user back $it")
        }
        readTransaction.commit()
        session.close()
    }
}