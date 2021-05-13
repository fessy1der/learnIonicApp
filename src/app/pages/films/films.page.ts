import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {

  films: Observable<any>;

  constructor(private navController: NavController, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.films = this.http.get('https://swapi.dev/api/films');
    this.films.subscribe(data => {
      console.log(data);
    });
  }

  openDetails(){
    this.router.navigateByUrl(`/tabs/films/42`);
  }

  goToPlanets(){
    this.navController.navigateRoot(`/tabs/planets`);
  }
}
