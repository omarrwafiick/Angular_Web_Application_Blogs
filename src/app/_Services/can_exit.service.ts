import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService } from './confirm.service';
@Injectable({
  providedIn: 'root'
})
export class CanExitClass {
    confirmationService = inject(ConfirmationService);
    formForConfirm:FormGroup;
   
    async CanExit(): Promise<boolean> {
      if (this.formForConfirm.dirty) {
        const result = await this.confirmationService.confirm(
          'You have unsaved changes. Do you want to navigate away from this page?'
        );
        return result; 
      }
      return true;
    }
} 