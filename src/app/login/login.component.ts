import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInUser } from '../auth/auth.model';
import { AuthState } from '../auth/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authState = inject(AuthState);

  ifNewUser$ = this.authState.ifNewUser$;

  pageTitle: string;
  pageSubtitle: string;

  readonly isAuthenticated$ = this.authState.isAuthenticated$;

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getTitles();
  }

  private getTitles() {
    this.route.data.subscribe((data) => {
      this.pageTitle = data['title'];
      this.pageSubtitle = data['subtitle'];
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authState.signIn(this.loginForm.value as SignInUser);
    this.loginForm.reset();
    this.router.navigate(['/foods']);
  }
}
