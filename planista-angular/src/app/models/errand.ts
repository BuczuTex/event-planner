import { Category } from "./category";
import { Company } from "./company";

export enum stateEnum {
    WAITING_FOR_COMPANY = 0,
    WAITING_FOR_ADMIN = 1,
    ACCEPTED = 2,
    FINISHED = 3,
    DELETED = 4,
    RATED = 5,
    ADDED_BY_COMPANY = 6,
};

export class Errand {
    private _id: number;
    private _title: string;
    private _description: string;
    private _state: number;
    private _companyId: number;
    private _eventId: number;
    private _categoryId: number;

    private _company: Company;
    private _category: Category;

    public constructor(title: string, description: string, state: number) {
        this._title = title;
        this._description = description;
        this._state = state;
    }

    public get title() {
        return this._title;
    }
    public get description() {
        return this._description;
    }
    public get state() {
        return this._state;
    }
    public set title(value: string) {
        this._title = value;
    }
    public set description(value: string) {
        this._description = value;
    }
    public set state(value: number) {
        this._state = value;
    }
    public get companyId() {
        return this._companyId;
    }
    public set companyId(value: number) {
        this._companyId = value;
    }
    public get eventId() {
        return this._eventId;
    }
    public set eventId(value: number) {
        this._eventId = value;
    }
    public get id() {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get company() {
        return this._company;
    }
    public set company(value: Company) {
        this._company = value;
    }
    public get category() {
        return this._category;
    }
    public set category(value: Category) {
        this._category = value;
    }
    public get categoryId() {
        return this._categoryId;
    }
    public set categoryId(value: number) {
        this._categoryId = value;
    }
}