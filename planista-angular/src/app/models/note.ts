export class Note {
    private _id: number;
    private _title: string;
    private _contents: string;
    private _eventId: number;

    constructor(title: string, contents: string, eventId: number) {
        this._title = title;
        this._contents = contents;
        this._eventId = eventId;
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
        this.title = value;
    }
    public get contents() {
        return this._contents;
    }
    public set contents(value: string) {
        this._contents = value;
    }
    public get eventId() {
        return this._eventId;
    }
    public set eventId(value: number) {
        this._eventId = value;
    }
}