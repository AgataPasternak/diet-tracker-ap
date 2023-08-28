import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { FoodsComponent } from './foods/foods.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/foods', pathMatch: 'full' },
  {
    path: 'foods', component: FoodsComponent, data: { // dane do często używane do wyśtwietlenia nagłówków; queryParams, używane często do filtów
      title: 'Foods',
      subtitle: 'List of foods'
    }
  },
  {
    path: 'diary', component: DiaryComponent, data: {
      title: 'Diary',
      subtitle: 'Your diet diary'
    }
  },
  {
    path: 'login', component: LoginComponent, data: {
      title: '  ',
      subtitle: 'Login to your account'
    }
  },
  { path: '**', component: PageNotFoundComponent }, // dodac komponent 404
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
