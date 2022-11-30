import {makeAutoObservable} from "mobx";

const BASE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8080/" : "https://instasnap.instasnap.diplomportal.dk/"

export const LoginStates = {LOGGED_IN: "logged in", LOGGED_OUT: "logged out", LOGGING_IN: "loading"}
export const SignupStates = {SIGNING_UP: "loading", ERROR: "failed"}

class TokenDataStore {
    state = LoginStates.LOGGED_OUT
    token = ""

    constructor() {
        let currentToken = localStorage.getItem("token")
        console.log("token: " + currentToken)
        if (currentToken !== "" && currentToken !== null) {
            this.validate(currentToken)
        } else {
            this.logout()
        }

        makeAutoObservable(this)
    }

    loginCampusNet = (onError) => {
        fetch(BASE_URL + "api/campusnet/login", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(
            (response) => {
                if (response.ok){

                } else {
                    onError(response.status)
                }
            }
        )
    }

    login = (email, password, onError, onSuccess) => {
        this.state = LoginStates.LOGGING_IN
        fetch(BASE_URL + "api/login/", {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(
            (response) => {
                if (response.ok){
                    response.text().then(
                        (token) => {
                            console.log("Got token " + token)
                            this.token = token
                            this.state = LoginStates.LOGGED_IN
                            localStorage.setItem("token", token)
                            onSuccess()
                        }
                    )
                } else {
                    console.log(response.body)
                    onError(response.status)
                }
            }
        ).catch((e) => {
                console.log(e.message)
                this.state = LoginStates.LOGGED_OUT
                onError(e.response.status)
            }
        )
    }

    validate = (token) => {
        this.state = LoginStates.LOGGING_IN
        fetch(BASE_URL + "api/login/validate/", {
            method: 'POST',
            body: token,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(
            (response) => {
                if (response.ok) {
                    response.text().then(
                        (user) => {
                            console.log(user)
                            console.log("Token validated\nLogging in")
                            this.token = token;
                            this.state = LoginStates.LOGGED_IN
                        }
                    )
                } else {
                    console.log("Token invalidated")
                    this.logout()
                }
            }
        ).catch((e) => {
            console.log("Token invalidated")
            this.logout()
        })
    }

    logout = () => {
        this.token = ''
        localStorage.clear()
        this.state = LoginStates.LOGGED_OUT
    }

    createUser = (name, email, password, birthday, onError, onSuccess) => {
        fetch(BASE_URL + "api/signup/", {
            method: 'POST',
            body: JSON.stringify({name: name, email: email, password: password, birthday: birthday.time}),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(
            (response) => {
                if (response.ok){
                    response.text().then(
                        (text) => {
                            console.log(text)
                            onSuccess()
                        }
                    )
                } else {
                    response.text().then(
                        (text) => {
                            console.log(text)
                        }
                    )
                    onError()
                }
            }
        ).catch((e) => {
                console.log(e)
                onError()
            }
        )
    }
}

export const tokenDataStore = new TokenDataStore()