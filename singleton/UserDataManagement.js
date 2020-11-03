export default class UserDataManagement {

    dataUser = null;

    static setUserData(data) {

        if (data !== null) {

            this.dataUser = data
        }

    }

    static getUserData() {
        // get the value out for the given key
        return  this.dataUser;
    }
}
