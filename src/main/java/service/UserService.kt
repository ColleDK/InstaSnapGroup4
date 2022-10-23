package service

import db.HibernateController
import db.model.User
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType

@Produces(MediaType.APPLICATION_JSON)
@Path("users")
class UserService {
    private val sessionFactory = HibernateController.init("pgtest-db.instasnap.diplomportal.dk:6543/pg")

    @POST
    fun createUser(user: User): Int {
        sessionFactory.openSession().persist(user)
        return user.id
    }

    @GET
    fun getUsers(): List<User> {
        sessionFactory.openSession().let { session ->
            val query = session.criteriaBuilder.createQuery(User::class.java).apply {
                from(User::class.java)
            }

            return session.createQuery(query).resultList
        }
    }

    @PUT
    fun updateUser(userId: Int, newUser: User) {
        sessionFactory.openSession().saveOrUpdate(newUser)
    }
}