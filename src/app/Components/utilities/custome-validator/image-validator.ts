import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxFileSizeValidator(maxSizeMB: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    if (file instanceof File) {
      const fileSizeMB = file.size / (1024 * 1024); 
      if (fileSizeMB > maxSizeMB) {
        return { error:"file is bigger than 15MB" };
      }
    }

    return null; 
  };
}