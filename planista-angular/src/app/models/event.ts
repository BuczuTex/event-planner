import { Address } from "./address";
import { Category } from "./category";
import { Errand } from "./errand";
import { ToDoListItem } from "./toDoListItem";
import { User } from "./user";
import { Note } from "./note";
import { Company } from "./company";

export class Event {
    private _id: number;
    private _name: string;
    private _description: string;
    private _date: string;
    private _address: Address;

    private _categoryId: number;
    private _addressId: number;
    private _userId: string;

    private _category: Category;
    private _user: User;

    private _toDoListItems: Array<ToDoListItem>;
    private _errands: Array<Errand>;
    private _notes: Array<Note>;
    private _companies: Array<Company>;

    constructor(name: string, description: string, date: string, address: Address, category: Category) {
        this._name = name;
        this._description = description;
        this._date = date;
        this._address = address;
        this._category = category;
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
    public get date() {
        return this._date;
    }
    public set date(value: string) {
        this._date = value;
    }
    public get categoryId() {
        return this._categoryId;
    }
    public set categoryId(value: number) {
        this._categoryId = value;
    }
    public get addressId() {
        return this._addressId;
    }
    public set addressId(value: number) {
        this._addressId = value;
    }
    public get userId() {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }
    public get category() {
        return this._category;
    }
    public set category(value: Category) {
        this._category = value;
    }
    public get address() {
        return this._address;
    }
    public set address(value: Address) {
        this._address = value;
    }
    public get toDoListItems() {
        return this._toDoListItems;
    }
    public set toDoListItems(value: Array<ToDoListItem>) {
        this._toDoListItems = value;
    }
    public get errands() {
        return this._errands;
    }
    public set errands(value: Array<Errand>) {
        this._errands = value;
    }
    public get user() {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }
    public get notes() {
        return this._notes;
    }
    public set notes(value: Array<Note>) {
        this._notes = value;
    }
    public get companies() {
        return this._companies;
    }
    public set companies(value: Array<Company>) {
        this._companies = value;
    }
}