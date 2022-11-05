package service.models

data class PostRemote(
    val author: UserRemote = UserRemote(),
    val comments: List<String> = listOf(),
    val upvotes: Int = 0,
    val downvotes: Int = 0
)
