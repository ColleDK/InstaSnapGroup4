import {makeAutoObservable} from "mobx";

const BASE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8080/" : "https://instasnap.instasnap.diplomportal.dk/"

class PostsDataStore {
    posts = []

    constructor() {
        makeAutoObservable(this)
    }

    getPosts(onError) {
        this.clearPosts()

        const token = localStorage.getItem("token")

        fetch(BASE_URL + "api/main", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        }).then((response) => {
            if (response.ok) {
                response.text().then(
                    (posts) => {
                        console.log("Received posts " + posts)
                        this.posts = [...this.posts, posts]
                    }
                )
            } else {
                console.log(response)
                onError(response.status)
            }
        }).catch((e) => {
            console.log(e)
            onError(500)
        })

    }

    clearPosts = () => {
        while(this.posts.length > 0){
            this.posts.pop()
        }
    }

}

export const postDataSTore = new PostsDataStore()