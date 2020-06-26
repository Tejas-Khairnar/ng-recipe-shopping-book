export class User {
    // create user with following properties
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    // for class inside it act as method but from outside it access as property of this class
    get token() {
        // check for token expiry here
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        // if token valid then return here
        return this._token;
    }
}