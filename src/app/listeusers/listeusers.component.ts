import { Component, OnInit } from '@angular/core';
import { concatMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { UserStats } from '../model/user-stats';
import { ListedesusersComponent } from '../users/listedesusers/listedesusers.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listeusers',
  templateUrl: './listeusers.component.html',
  styleUrls: ['./listeusers.component.scss']
})


export class ListeusersComponent implements OnInit {
  
    users: User[] = [];

  constructor(private authService: AuthenticationService, private userService: UserService,   private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;

      for (const user of this.users) {
        this.authService.getUserStats(user.id).subscribe(stats => {
          user.stats = {
            questionCount: stats.questionCount,
            reponseCount: stats.reponseCount
          };
        });
      }
    });
  }

  openUserDialog(user: User): void {
    const dialogRef = this.dialog.open(ListedesusersComponent, {
      data: user
    });
  }
}



