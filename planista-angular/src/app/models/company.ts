import { Event } from "./event";
import { Errand } from "./errand";

export class Company {
    private _id: number;
    private _name: string;
    private _description: string;
    private _userId: string;
    private _nip: number;
    private _views: number;
    private _addressId: number;

    private _events: Array<Event>;
    private _errands: Array<Errand>;

    constructor(name: string, description: string, nip: number) {
        this._name = name;
        this._description = description;
        this._nip = nip;
        this._views = 0;

        this._events = new Array<Event>();
    }

    public get id() {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get name() {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get description() {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get userId() {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }
    public get nip() {
        return this._nip;
    }
    public set nip(value: number) {
        this._nip = value;
    }
    public get views() {
        return this._views;
    }
    public set views(value: number) {
        this._views = value;
    }
    public get addressId() {
        return this._addressId;
    }
    public set addressId(value: number) {
        this._addressId = value;
    }
    public get events() {
        return this._events;
    }
    public set events(value: Array<Event>) {
        this._events = value;
    }
    public get errands() {
        return this._errands;
    }
    public set errands(value: Array<Errand>) {
        this._errands = value;
    }
}