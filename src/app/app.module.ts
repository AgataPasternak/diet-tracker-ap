import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiaryComponent } from './diary/diary.component';
import { DialogFoodComponent } from './foods/dialog-food/dialog-food.component';
import { FoodsComponent } from './foods/foods.component';
import { NutriScoreComponent } from './foods/nutri-score/nutri-score.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { TagsToNamePipe } from './tags-to-name.pipe';
import { TagsToArrayPipe } from './tags-to-array.pipe';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodsComponent,
    NutriScoreComponent,
    DialogFoodComponent,
    HeaderComponent,
    DiaryComponent,
    LoginComponent,
    SidenavListComponent,
    PageNotFoundComponent,
    TagsToNamePipe,
    TagsToArrayPipe,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
