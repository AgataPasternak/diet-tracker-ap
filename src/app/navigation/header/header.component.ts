import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // ?? dlaczego outpu jest tutaj a nie w navigation component (czy nie działa tylko w komponentach rodzicach?)
  @Output() toggleSlidenav = new EventEmitter<void>();

  onToggleSlidenav() {
    this.toggleSlidenav.emit();
  }
}
