
import { Component, OnInit, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogFoodComponent } from './dialog-food/dialog-food.component';

import { FoodsState } from './foods.state';


@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})

export class FoodsComponent implements OnInit {
  // ??? --> dlaczego columnsToDisplay nie musi widzieć object Response
  columnsToDisplay = ['id', 'name', 'caloriesPer100g', 'nutriScore', 'actionsColumn'];

  private state = inject(FoodsState);
  public dialog = inject(MatDialog);

  response$ = this.state.foods$;
  loading$ = this.state.loading$;
  deleteInProgress$ = this.state.deleteInProgress$;
  postInLoading$ = this.state.postInLoading$;
  errorMessage$ = this.state.errorMessage$;

  ngOnInit(): void {
    this.state.getFoods();

    // this.httpClient.get<Response>(
    //   'http://localhost:8080/api/foods/'
    // ).subscribe((data) => {
    //   this.foods = data;
    // })
  }
  onDeleteFood(id: string) {
    this.state.deleteFoods(id);
  }


  searchValue(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.state.searchFood(filterValue);
    if (filterValue === '') {
      this.state.getFoods();
    }
  }
  addFoodDialog() {
    this.openDialog('Dodaj produkt', true);
  }
  onPreviewFood(id: string) {
    this.openDialog('Podgląd produktu', false);
  }
  onEditFood(id: string) {
    this.openDialog('Edytuj produkt', true);
  }
  openDialog(title: any, showAccions: boolean) {
    var _dialog = this.dialog.open(DialogFoodComponent, {
      width: '40%',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: {
        title: title,
        showAccions: showAccions
      }
    });
    _dialog.afterClosed().subscribe(result => {
      console.log(result);
    }
    );
  }
}
