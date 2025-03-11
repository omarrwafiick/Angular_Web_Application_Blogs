import { NgIf } from '@angular/common';
import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action-box',
  templateUrl: './confirm-action-box.component.html',
  standalone:true,
  imports:[NgIf]
})
export class ConfirmActionBoxComponent {
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmActionBoxComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
     this.message = data.message;
  }

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}