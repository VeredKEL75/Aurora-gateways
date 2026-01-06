export class CredentialsModel {
    public email: string;
    public password: string;

    constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }
}