import { Component, OnInit } from '@angular/core';
import { concatMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { UserStats } from '../model/user-stats';

@Component({
  selector: 'app-listeusers',
  templateUrl: './listeusers.component.html',
  styleUrls: ['./listeusers.component.scss']
})
export class ListeusersComponent implements OnInit {
  stats: UserStats[] = [];

  questionCount = this.stats.find((s: UserStats) => s.firstname === this.users[0]?.firstname)?.questionCount || 0;
  reponseCount = this.stats.find((s: UserStats) => s.firstname === this.users[0]?.firstname)?.reponseCount || 0;

  users: User[] = []; // initialize the users property

  constructor(private  userService: UserService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getUsersStats();


  }

  getAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.log(error);
        });
  }

  getUsersStats(): void {
    this.userService.getAllUsers().pipe(
      concatMap(users => {
        const requests = users.map(user => this.authService.getStats());
  
        return forkJoin(requests).pipe(
          map((results: any[]) => {
            return results.map((result, index) => ({
              firstname: users[index].firstname || '',
              questionCount: result.questionCount || 0,
              reponseCount: result.reponseCount || 0
            }));
          })
        );
      })
    ).subscribe(
      (stats: UserStats[]) => {
        this.stats = stats;
      },
      error => {
        console.log(error);
      }
    );
  }

}
