
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogFoodComponent } from './dialog-food/dialog-food.component';
import { FoodsState } from './foods.state';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})

export class FoodsComponent implements OnInit, AfterViewInit {
  // ??? --> dlaczego columnsToDisplay nie musi widzieć object Response
  columnsToDisplay = ['id', 'name', 'caloriesPer100g', 'nutriScore', 'actionsColumn'];

  private state = inject(FoodsState);
  public dialog = inject(MatDialog);

  response$ = this.state.foods$;
  loading$ = this.state.loading$;
  deleteInProgress$ = this.state.deleteInProgress$;
  postInLoading$ = this.state.postInLoading$;
  errorMessage$ = this.state.errorMessage$;

  dataSource: MatTableDataSource<Response>;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  ngOnInit(): void {
    this.state.getFoods();
    // sortowanie - jako dataSource podaje Observable
    // this.dataSource = new MatTableDataSource(this.response$);
    // this.dataSource.sort = this.sort;


  }

  ngAfterViewInit() {
    // paginacja - jako dataSource podaje zasubskrybowany object data
    this.response$.subscribe((data) => {
      // this.dataSource = new MatTableDataSource(data);
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
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
  openDialog(title: any, showAccions: boolean, id?: string, readonly?: boolean, editMode?: boolean) {
    var _dialog = this.dialog.open(DialogFoodComponent, {
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
    _dialog.afterClosed().subscribe(result => {
      // console.log(result);
    }
    );
  }
}
