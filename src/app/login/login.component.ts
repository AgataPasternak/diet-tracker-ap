import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SignInUser } from '../services/auth/auth.model';
import { AuthState } from '../services/auth/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private auth = inject(AuthState);

  pageTitle: string;
  pageSubtitle: string;

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
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

    this.auth.signIn(this.loginForm.value as SignInUser);
    this.loginForm.reset();
  }

}
