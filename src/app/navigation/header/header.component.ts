import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AuthState } from 'src/app/auth/auth.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSlidenav = new EventEmitter<void>();

  private authState = inject(AuthState);
  readonly isAuthenticated$ = this.authState.isAuthenticated$;

  onToggleSlidenav() {
    this.toggleSlidenav.emit();
  }
  onSignOut() {
    this.authState.signOut();
  }
}
