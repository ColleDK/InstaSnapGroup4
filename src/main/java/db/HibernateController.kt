package db

import db.model.User
import org.hibernate.SessionFactory
import org.hibernate.cfg.Configuration

object HibernateController {
    var sessionFactory: SessionFactory? = null
        private set

    fun init(url: String): SessionFactory {
        sessionFactory?.let {
            return it
        } ?: run {
            val configuration = Configuration().apply {
                addAnnotatedClass(User::class.java)

                setProperty("hibernate.connection.username", System.getenv("instasnapuser"))
                setProperty("hibernate.connection.password", System.getenv("instasnappassword"))
                setProperty("hibernate.connection.url", "jdbc:postgresql://$url")
                setProperty("hibernate.hbm2ddl.auto", "update")
            }

            return configuration.buildSessionFactory().also { sessionFactory = it }
        }
    }
}