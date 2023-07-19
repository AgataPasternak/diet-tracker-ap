
import { AfterViewInit, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogFoodComponent } from './dialog-food/dialog-food.component';
import { Dialog } from './dialog-food/dialog.model';
import { Food } from './foods.model';
import { FoodsState } from './foods.state';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})

export class FoodsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort)
  sort: MatSort; // przechwytuje referencję (MatSort) do sortowania, umieszczam ją w zmiennej sort
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Input() public inputData!: Dialog;

  columnsToDisplay = ['id', 'name', 'caloriesPer100g', 'nutriScore', 'tags', 'actionsColumn', 'photo'];

  private state = inject(FoodsState);
  dialog = inject(MatDialog);
  private fb = inject(FormBuilder);
  route = inject(ActivatedRoute);

  response$ = this.state.foods$;
  loading$ = this.state.loading$;
  deleteInProgress$ = this.state.deleteInProgress$;
  postInLoading$ = this.state.postInLoading$;
  errorMessage$ = this.state.errorMessage$;
  search = this.fb.control('');
  pageTitle: string;
  pageSubtitle: string;


  dataSource: MatTableDataSource<Food>;

  ngOnInit(): void {
    this.state.getFoods();
    this.pageTitle = this.route.snapshot.params['page_title'];
    this.pageSubtitle = this.route.snapshot.params['page_subtitle'];
  }

  ngAfterViewInit(): void {
    this.response$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
  idFood!: string;

  addFoodDialogData = {
    title: 'Dodaj produkt',
    showActions: true,
    id: undefined,
    readonly: false,
    editMode: false
  }

  onPreviewFoodData = {
    title: 'Podgląd produktu',
    showActions: false,
    // this.idFood jest undefined
    id: this.idFood,
    readonly: true,
    editMode: false
  }


  addFoodDialog() {
    this.openDialog(this.addFoodDialogData);
  }
  onPreviewFood(id: string) {
    this.idFood = id;
    console.log(this.idFood);
    this.openDialog(this.onPreviewFoodData);
    console.log(this.onPreviewFoodData);
  }
  onEditFood(id: string) {
    //this.openDialog('Edytuj produkt', true, id, false, true);
  }

  openDialog(inputData: Dialog) {
    const dialog = this.dialog.open(DialogFoodComponent, {
      width: '40%',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: {
        title: inputData.title,
        showActions: inputData.showActions,
        id: inputData.id,
        readonly: inputData.readonly,
        editMode: inputData.editMode
      }
    });
  }
}
