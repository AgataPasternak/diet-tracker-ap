import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLineModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponents, ngMocks } from 'ng-mocks';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(
    async () => TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule, MatSidenavModule, MatLineModule, MatPaginatorModule, NoopAnimationsModule],
      declarations: [
        AppComponent,
        MockComponents(FooterComponent, HeaderComponent, SidenavListComponent)
      ],
    }).compileComponents()
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should have as title 'diet-tracker-ap'`, () => {
    expect(fixture.componentInstance.title).toEqual('diet-tracker-ap');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // expect(compiled.querySelector('.title')?.textContent).toContain('diet-tracker-ap');
    const titleEl = ngMocks.find('.title');
    expect(titleEl).toBeTruthy();
    expect(titleEl.nativeElement.textContent).toContain('diet-tracker-ap');
  });
});
