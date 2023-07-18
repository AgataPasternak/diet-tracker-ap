
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogFoodComponent } from './dialog-food/dialog-food.component';
import { Food } from './foods.model';
import { FoodsState } from './foods.state';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})

export class FoodsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  columnsToDisplay = ['id', 'name', 'caloriesPer100g', 'nutriScore', 'actionsColumn'];

  private state = inject(FoodsState);
  dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  response$ = this.state.foods$;
  loading$ = this.state.loading$;
  deleteInProgress$ = this.state.deleteInProgress$;
  postInLoading$ = this.state.postInLoading$;
  errorMessage$ = this.state.errorMessage$;
  search = this.fb.control('');

  dataSource: MatTableDataSource<Food>;

  ngOnInit(): void {
    this.state.getFoods();
  }

  ngAfterViewInit(): void {
    this.response$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.sort = this.sort;
    });
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
    this.openDialog('Dodaj produkt', true, undefined, false, false);
  }
  onPreviewFood(id: string) {
    this.openDialog('Podgląd produktu', false, id, true, false);
  }
  onEditFood(id: string) {
    this.openDialog('Edytuj produkt', true, id, false, true);
  }
  // poprawić literówkę Acctionss
  // argumnet funckji niech będzie obiektem (w dialogu)
  openDialog(title: string, showAccions: boolean, id?: string, readonly?: boolean, editMode?: boolean) {
    const dialog = this.dialog.open(DialogFoodComponent, {
      width: '40%',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: {
        title: title,
        showAccions: showAccions,
        id: id,
        readonly: readonly,
        editMode: editMode
      }
    });
  }
}
