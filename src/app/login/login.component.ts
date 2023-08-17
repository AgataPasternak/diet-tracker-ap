import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  pageTitle: string;
  pageSubtitle: string;

  isLoginMode = true;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
    const routerData = this.route.data.subscribe((data) => {
      this.pageTitle = data['title'];
      this.pageSubtitle = data['subtitle'];
    });
  }

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
}
