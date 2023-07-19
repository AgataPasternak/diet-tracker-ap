import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { FoodsComponent } from './foods/foods.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'foods/:page_title/:page_subtitle', component: FoodsComponent },
  { path: 'diary/:page_title/:page_subtitle', component: DiaryComponent },
  { path: 'login/:page_title/:page_subtitle', component: LoginComponent },
  { path: '', redirectTo: '/foods', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
