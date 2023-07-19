import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { FoodsComponent } from './foods/foods.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'foods', component: FoodsComponent },
  { path: 'diary', component: DiaryComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/foods', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
