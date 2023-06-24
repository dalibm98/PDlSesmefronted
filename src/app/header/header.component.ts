import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Notif } from '../model/notif';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  notifications  : Notif [] = []
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router , private authService : AuthenticationService) {}

  ngOnInit(): void {

    this.authService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  markAsRead(notificationId: number): void {
    this.authService.markNotificationAsRead(notificationId).subscribe((notification) => {
      // Do something with the updated notification
    });
  }
}
