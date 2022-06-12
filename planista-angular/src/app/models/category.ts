export enum categoryNames {
    Urodziny = 1,
    Zjazd = 2, 
    Ślub = 3,
    Wesele = 4
};
export class Category {
    private _id: Number;
    private _name: string;

    constructor(name: string) {
        this._name = name;
        this._id = +Object.keys(categoryNames).filter(x => categoryNames[x] == name);
    }

    public get id() {
        return this._id;
    }
    public set id(value: Number) {
        this._id = value;
    }
    public get name() {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
}