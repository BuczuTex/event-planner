import { Company } from "./company";
import { User } from "./user";

export class Opinion {
    private _id: number;
    private _contents: string;
    private _addDate: string;

    private _companyId: number;
    private _userId: string;

    private _company: Company;
    private _user: User;

    constructor(contents: string, addDate: string) {
        this._contents = contents;
        this._addDate = addDate;
    }

    public get id() {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get contents() {
        return this._contents;
    }
    public set contents(value: string) {
        this._contents = value;
    }
    public get addDate() {
        return this._addDate;
    }
    public set addDate(value: string) {
        this._addDate = value;
    }
    public get company() {
        return this._company;
    }
    public set company(value: Company) {
        this._company = value;
    }
    public get user() {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }
    public get companyId() {
        return this._companyId;
    }
    public set companyId(value: number) {
        this._companyId = value;
    }
    public get userId() {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }
}