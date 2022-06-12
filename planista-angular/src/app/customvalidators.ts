import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    constructor() {}

   static passwordDoesNotMatchValidator: ValidatorFn = (control: AbstractControl): 
    ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if(password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ incorrectPasswords: true });
            return { incorrectPasswords: true };
        }

        return null;
    }
}
