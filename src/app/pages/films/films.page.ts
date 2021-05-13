import { ApiService } from './../../services/api.service';
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

  constructor(private navController: NavController, private router: Router, private http: HttpClient, private apiService: ApiService) { }

  ngOnInit() {
    this.films = this.apiService.getFilms();
  }

  openDetails(film){
    let split = film.url.split('/');
    let filmId = split[split.length - 2];
    this.router.navigateByUrl(`/tabs/films/${filmId}`);
  }

  goToPlanets(){
    this.navController.navigateRoot(`/tabs/planets`);
  }
}
