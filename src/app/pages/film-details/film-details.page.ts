import { Storage } from '@ionic/storage';
import { FavoriteService } from './../../services/favorite.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ApiService } from './../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.page.html',
  styleUrls: ['./film-details.page.scss'],
})

export class FilmDetailsPage implements OnInit {
  film: any;
  isFavorite = false;
  filmId = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private apiService: ApiService,
    private emailComposer: EmailComposer,
    private favorite: FavoriteService,
    private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    this.filmId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.getFilm(this.filmId).subscribe( res => {
      this.film = res;
    });

    this.favorite.isFavorite(this.filmId).then(isFav => {
      this.isFavorite = isFav;
    });
  }

  shareFilm() {
    let email = {
      to: 'saimon@devdactic.com',
      subject: 'I love this one: ' + this.film.title,
      body: 'Can you remember the opening?<br><br>\"' + this.film.opening_crawl + '\"',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  favoriteFilm(){
    return this.favorite.favoriteFilm(this.filmId).then(() => {
      this.isFavorite = true;
    });
  }

  unfavoriteFilm(){
    return this.favorite.unfavoriteFilm(this.filmId).then(() => {
      this.isFavorite = false;
    });
  }
}