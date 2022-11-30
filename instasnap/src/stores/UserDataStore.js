import {makeObservable, observable} from "mobx";

const BASE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8080/" : "https://instasnap.instasnap.diplomportal.dk/"

class UserDataStore {
    users = []

    constructor() {
        makeObservable(this, {users: observable})
        this.getUser()
    }

    getUser = () => {
        const token = localStorage.getItem("token")
        fetch(BASE_URL + "api/users", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        }).then(
            (response) => {
                if (response.ok) {
                    response.text().then(
                        (user) => {
                            console.log("Received user " + user)
                            this.users = [...this.users, user]
                        }
                    )
                }
            }
        )
    }
}

export const userDataStore = new UserDataStore()