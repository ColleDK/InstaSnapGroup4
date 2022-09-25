import {makeObservable, observable} from "mobx";

class UserDataStore {
    users = []

    constructor() {
        makeObservable(this, {users: observable})
    }

    addUser = (user) => {
        this.users.push(user)
    }

    doesUserExist = (user) => {
        let i;
        for (i = 0; i < this.users.length; i++) {
            if (this.users[i].password === user.password && this.users[i].email === user.email) {
                return true;
            }
        }

        return false;
    }
}

export const userDataStore = new UserDataStore()