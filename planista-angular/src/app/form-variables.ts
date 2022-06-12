// TODO: Validators!!!
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "./customvalidators";

export class FormVariables {
    static userNamePattern = new RegExp("^\\S\\w*$");

    public static passwordValidator = CustomValidators.passwordDoesNotMatchValidator;

    // Validators appended to form
    public static userForm = {
        userName: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(64), Validators.required,
        Validators.pattern(this.userNamePattern)])],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        email: ['', Validators.compose([Validators.email, Validators.maxLength(256), Validators.required])],
        firstName: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(50), Validators.required])]
      };
      // Validators appended to form
      public static companyForm = {
        name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
        nip: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
        description: ['', Validators.compose([Validators.required, Validators.minLength(60) ,Validators.maxLength(1000)])],
      };
      // Validators appended to form
      public static addressForm = {
        street: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        buildingNumber: ['', [Validators.required]],
        flatNumber: [''],
        city: ['', [Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])]],
        zipCode: ['', [Validators.required, Validators.pattern("^[0-9]{2}-[0-9]{3}")]]
      };
      // Validators appended to form
      public static loginForm = {
        username: ['', Validators.required],
        password: ['', Validators.required],
      };
      // Validators appended to form
      public static errandForm = {
        title: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        description: ['', Validators.compose([Validators.required, Validators.maxLength(500)])]
      };
      // Validators appended to form
      public static noteForm = {
        title: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        contents: ['', Validators.compose([Validators.required, Validators.maxLength(500)])]
      };
      // Validators appended to form
      public static toDoListItemForm = {
        title: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        description: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
      };
      // Validators appended to form
      public static eventForm = {
        name: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        description: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
        date: ['', Validators.required],
        category: ['', Validators.required]
      };
      // Validators appended to form
      public static opinionForm = {
        contents: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
      };
}
