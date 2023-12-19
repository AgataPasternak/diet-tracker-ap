import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
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
import { debounceTime, take } from 'rxjs';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss'],
})
export class FoodsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort)
  sort: MatSort; // przechwytuje referencję (MatSort) do sortowania, umieszczam ją w zmiennej sort
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Input() public inputData!: FoodDialogData;
  @Input() public isReadOnly = false;

  columnsToDisplay = [
    'id',
    'name',
    'caloriesPer100g',
    'nutriScore',
    'tags',
    'photo',
    'actionsColumn',
  ];

  private state = inject(FoodsState);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private tagsState = inject(TagsState);
  private route = inject(ActivatedRoute);

  private readonly response$ = this.state.foods$;
  readonly loading$ = this.state.loading$;
  readonly tags$ = this.tagsState.tags$;
  readonly deleteInProgress$ = this.state.deleteInProgress$;
  readonly postInLoading$ = this.state.postInLoading$;
  readonly errorMessage$ = this.state.errorMessage$;
  search = this.fb.control('');
  searchTag = this.fb.control('');
  pageTitle: string;
  pageSubtitle: string;

  dataSource: MatTableDataSource<Food>;

  ngOnInit(): void {
    this.getTitles();
    this.state.getFoods();
    this.tagsState.getTags();
    this.response$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  private getTitles() {
    this.route.data.subscribe((data) => {
      this.pageTitle = data['title'];
      this.pageSubtitle = data['subtitle'];
    });
  }

  ngAfterViewInit(): void {
    // this.response$.subscribe((data) => {
    //   this.dataSource = new MatTableDataSource(data.data);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    // });
  }

  onDeleteFood(id: string) {
    this.state.deleteFoods(id);
  }

  searchValue(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    const filterValue =
      (event.target as HTMLInputElement).value.charAt(0).toUpperCase() +
      (event.target as HTMLInputElement).value.slice(1);

    //TODO: jak używać .pipe(debounceTime(300)) w tym miejscu?
    this.tags$.pipe(take(1), debounceTime(300)).subscribe((data) => {
      const tagId = data
        .filter((data) => data.name === filterValue)
        .map((tag) => tag.id)
        .toString();
      if (tagId) {
        this.state.searchFood(null, tagId);
      } else {
        this.state.searchFood(filterValue, null);
      }
    });

    if (filterValue === '') {
      this.state.getFoods();
    }
  }

  addFoodDialog() {
    const addFoodDialogData: FoodDialogData = {
      title: 'Add new food',
      showActions: true,
      id: undefined,
      readonly: false,
      editMode: false,
    };
    this.openDialog(addFoodDialogData);
  }

  onPreviewFood(id: string) {
    const onPreviewFoodData: FoodDialogData = {
      title: 'Food preview',
      showActions: false,
      id,
      readonly: true,
      editMode: false,
    };
    this.openDialog(onPreviewFoodData);
  }

  onEditFood(id: string) {
    const onEditFoodData: FoodDialogData = {
      title: 'Edit food',
      showActions: true,
      id,
      readonly: false,
      editMode: true,
    };
    this.openDialog(onEditFoodData);
  }

  private openDialog(data: FoodDialogData) {
    this.dialog.open(DialogFoodComponent, {
      width: '40%',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data,
    });
  }

  onTagsSelectionChange() {
    const selectedTags = this.searchTag.value;
    this.state.searchTag(selectedTags);
  }
}
