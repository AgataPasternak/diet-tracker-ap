
import { AfterViewInit, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodDialogData } from './dialog-food/dialog-food-data.model';
import { DialogFoodComponent } from './dialog-food/dialog-food.component';
import { Food } from './foods.model';
import { FoodsState } from './foods.state';
import { TagsState } from './tags.state';

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

  @Input() public inputData!: FoodDialogData;
  @Input() public isReadOnly = false;

  columnsToDisplay = ['id', 'name', 'caloriesPer100g', 'nutriScore', 'tags', 'photo', 'actionsColumn'];

  private state = inject(FoodsState);
  dialog = inject(MatDialog);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private tagsState = inject(TagsState);
  private route = inject(ActivatedRoute); // wszystko czego nie używam w temaplte powinno być prywatne

  response$ = this.state.foods$;
  loading$ = this.state.loading$;
  tags$ = this.tagsState.tags$;
  deleteInProgress$ = this.state.deleteInProgress$;
  postInLoading$ = this.state.postInLoading$;
  errorMessage$ = this.state.errorMessage$;
  search = this.fb.control('');
  pageTitle: string;
  pageSubtitle: string;

  dataSource: MatTableDataSource<Food>;

  ngOnInit(): void {
    const routerData = this.route.data.subscribe((data) => {
      this.pageTitle = data['title'];
      this.pageSubtitle = data['subtitle'];
    });
    this.state.getFoods();
    this.tagsState.getTags();
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

  addFoodDialog() {
    const addFoodDialogData: FoodDialogData = {
      title: 'Dodaj produkt',
      showActions: true,
      id: undefined,
      readonly: false,
      editMode: false
    }
    this.openDialog(addFoodDialogData);
  }

  onPreviewFood(id: string) {
    const onPreviewFoodData: FoodDialogData = {
      title: 'Food preview',
      showActions: false,
      id,
      readonly: true,
      editMode: false
    }
    this.openDialog(onPreviewFoodData);
  }

  onEditFood(id: string) {
    const onEditFoodData: FoodDialogData = {
      title: 'Edit food',
      showActions: true,
      id,
      readonly: false,
      editMode: true
    }
    this.openDialog(onEditFoodData);
  }

  private openDialog(data: FoodDialogData) {
    this.dialog.open(DialogFoodComponent, {
      width: '40%',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data
    });
  }
}
