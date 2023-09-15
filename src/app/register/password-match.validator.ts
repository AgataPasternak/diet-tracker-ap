import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (controle: AbstractControl): ValidationErrors | null => {
    const password = controle.get('password');
    const confirmPassword = controle.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
}