export enum UserRoles {
    USER = "User",
    COMPANY_USER = "CompanyUser",
    ADMINISTRATOR = "Administrator"
}

export class User {
    private _id: string;
    private _userName: string;
    private _password: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _lockoutEnabled: boolean;
    private _userActive: boolean;
    private _role: UserRoles;
    private _dateJoined: Date;

    constructor(userName: string, password: string, firstName: string, lastName: string, email: string, role: UserRoles,
                lockoutEnabled: boolean, userActive: boolean) {
                    this._userName = userName;
                    this._password = password;
                    this._firstName = firstName;
                    this._lastName = lastName;
                    this._email = email;
                    this._role = role;
                    this._lockoutEnabled = lockoutEnabled;
                    this._userActive = userActive;
                }

    public get userName() {
        return this._userName;
    }
    public set userName(value: string) {
        this._userName = value;
    }
    public get password() {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get firstName() {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    public get lastName() {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    public get email() {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get lockoutEnabled() {
        return this._lockoutEnabled;
    }
    public set lockoutEnabled(value: boolean) {
        this._lockoutEnabled = value;
    }
    public get userActive() {
        return this._userActive;
    }
    public set userActive(value: boolean) {
        this._userActive = value;
    }
    public get role() {
        return this._role;
    }
    public set role(value: UserRoles) {
        this._role = value;
    }
    public get dateJoined() {
        return this._dateJoined;
    }
    public set dateJoined(value: Date) {
        this._dateJoined = value;
    }
    public get id(){
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
}
