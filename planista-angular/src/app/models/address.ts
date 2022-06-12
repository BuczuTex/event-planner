export class Address {
    private _id: number;
    private _street: string;
    private _buildingNumber: number;
    private _flatNumber: number;
    private _city: string;
    private _zipCode: string;

    constructor(street: string, buildingNumber: number, city: string, zipCode: string, flatNumber?: number) {
        this._street = street;
        this._buildingNumber = buildingNumber;
        this._city = city;
        this._zipCode = zipCode;
        this._flatNumber = flatNumber;
    }

    public get id() {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get street() {
        return this._street;
    }
    public set street(value: string) {
        this._street = value;
    }
    public get buildingNumber() {
        return this._buildingNumber;
    }
    public set buildingNumber(value: number) {
        this._buildingNumber = value;
    }
    public get flatNumber() {
        return this._flatNumber;
    }
    public set flatNumber(value: number) {
        this._flatNumber = value;
    }
    public get city() {
        return this._city;
    }
    public set city(value: string) {
        this._city = value;
    }
    public get zipCode() {
        return this._zipCode;
    }
    public set zipCode(value: string) {
        this._zipCode = value;
    }
}