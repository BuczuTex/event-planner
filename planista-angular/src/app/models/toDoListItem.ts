import { Category } from "./category";
import { stateEnum } from "./errand";

export class ToDoListItem {
    private _id: number;
    private _title: string;
    private _description: string;
    private _state: number;
    
    private _eventId: number;

    private _category: Category;

    private _count: number;

    constructor(title: string, description: string, eventId: number, category: Category) {
        this._title = title;
        this._description = description;
        this._eventId = eventId;
        this._state = stateEnum.WAITING_FOR_ADMIN;
        this._category = category;
    }

    public get id() {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get title() {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get description() {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get state() {
        return this._state;
    }
    public set state(value: number) {
        this.state = value;
    }
    public get eventId() {
        return this._eventId;
    }
    public set eventId(value: number) {
        this.eventId = value;
    }
    public get category() {
        return this._category;
    }
    public set category(value: Category) {
        this._category = value;
    }
    public get count() {
        return this._count;
    }
    public set count(value: number) {
        this._count = value;
    }
}