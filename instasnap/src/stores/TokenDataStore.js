import {makeObservable, observable} from "mobx";

const BASE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8080/" : ""

const LoginStates = {LOGGED_IN: "logged in", LOGGED_OUT: "logged out", LOGGING_IN: "loading"}

class TokenDataStore {
    state = LoginStates.LOGGED_OUT
    token = ''

    constructor() {
        this.token = localStorage.getItem("token")
        makeObservable(this, {token: observable, state: observable})
    }

    login = (email, password) => {
        this.state = LoginStates.LOGGING_IN
        fetch(BASE_URL + "api/login/", {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(
            (response) => {
                response.text().then(
                    (token) => {
                        console.log("Got token " + token)
                        this.token = token
                        this.state = LoginStates.LOGGED_IN
                        localStorage.setItem("token", token)
                    }
                )
            }
        ).catch((e) => {
                console.log(e)
                this.state = LoginStates.LOGGED_OUT
            }
        )
    }
}

export const tokenDataStore = new TokenDataStore()