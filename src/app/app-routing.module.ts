import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { FoodsComponent } from './foods/foods.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { isUserLoggedInGuard } from './services/auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/foods', pathMatch: 'full' },
  {
    path: 'foods', 
    component: FoodsComponent, 
    canActivate: [isUserLoggedInGuard],
    data: {
      title: 'Foods',
      subtitle: 'List of foods'
    }
  },
  {
    path: 'diary', 
    component: DiaryComponent, 
    canActivate: [isUserLoggedInGuard],
    data: {
      title: 'Diary',
      subtitle: 'Your diet diary'
    },
    children: [
      { path: 'date/:date', component: DiaryComponent }
    ]
  },
  {
    path: 'login', component: LoginComponent, data: {
      title: '  ',
      subtitle: 'Login to your account'
    }
  },
  {
    path: 'register', component: RegisterComponent, data: {
      title: '  ',
      subtitle: 'Register to your account'
    }
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
