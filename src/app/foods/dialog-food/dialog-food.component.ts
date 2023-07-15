import { Component, Input, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-food',
  templateUrl: './dialog-food.component.html',
  styleUrls: ['./dialog-food.component.scss']
})
export class DialogFoodComponent {
  @Input() foodForm: any;
  @Input() postInLoading$: any;
  @Input() name: any;
  @Input() onSubmit: any;

  private ref = inject(MatDialogRef<DialogFoodComponent>);

  closeDialog() {
    this.ref.close();
  }

}
