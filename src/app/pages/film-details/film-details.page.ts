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

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private apiService: ApiService,
    private emailComposer: EmailComposer) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getFilm(id).subscribe( res => {
      this.film = res;
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
}