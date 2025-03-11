import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export class FormsOperations {
    isSubmitted:boolean=false;
    public hasDisplayableError(form:FormGroup,controlName?: string) : boolean{
        const control = form.get(controlName);
        return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty));  
    }
    public passMatchValidator : ValidatorFn = (control:AbstractControl):null=>{
        const pass = control.get('password');
        const conPass = control.get('confirmpassword');
        if(pass && conPass && pass.value!=conPass.value){
          conPass.setErrors({passwordMissMatch:true});
        }
        else return null;
        return null; 
    }; 
    sanitizeInput(userInput:string){
        return this.sanitizeString(userInput);
    }

    sanitizeString(input: string){
        if (!input) {
        return '';
        }
        return input
        .replace(/</g, '')
        .replace(/>/g, '')
        .replace(/"/g, '')
        .replace(/'/g, '')
        .trim();
    }
}
