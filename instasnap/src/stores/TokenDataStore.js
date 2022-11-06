import {makeObservable, observable} from "mobx";

const BASE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8080/" : "https://instasnap.instasnap.diplomportal.dk/"

export const LoginStates = {LOGGED_IN: "logged in", LOGGED_OUT: "logged out", LOGGING_IN: "loading"}
export const SignupStates = {SIGNING_UP: "loading", ERROR: "failed"}

class TokenDataStore {
    state = LoginStates.LOGGED_OUT
    token = ''

    // navigate = useNavigate()

    constructor() {
        let currentToken = localStorage.getItem("token")
        if (currentToken !== ''){
            this.validate(currentToken)
        } else {
            this.logout()
        }

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
                if (response.ok){
                    response.text().then(
                        (user) => {
                            console.log("Token validated\nLogging in")
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

    createUser = (name, email, password, birthday) => {
        fetch(BASE_URL + "api/signup/", {
            method: 'POST',
            body: JSON.stringify({name: name, email: email, password: password, birthday: birthday.time}),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(
            (response) => {
                response.text().then(
                    // () => { this.navigate(NavigationLocations.LOGIN) }
                )
            }
        ).catch((e) => {
                console.log(e)
            }
        )
    }
}

export const tokenDataStore = new TokenDataStore()