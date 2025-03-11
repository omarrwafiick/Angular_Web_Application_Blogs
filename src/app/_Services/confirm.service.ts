import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionBoxComponent } from '../Components/utilities/confirm-action-box/confirm-action-box.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private dialog: MatDialog) {}

  confirm(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmActionBoxComponent, {
      width: '400px',
      data: { message },
    });
    return dialogRef.afterClosed().toPromise();
  }
}
