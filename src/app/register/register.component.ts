import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../services/auth/auth.model';
import { AuthState } from '../services/auth/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private auth = inject(AuthState);

  pageTitle: string;
  pageSubtitle: string;

  registerForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
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
    if (this.registerForm.invalid) {
      return;
    }
    this.auth.signUp(this.registerForm.value as User);
    this.registerForm.reset();
  }

}