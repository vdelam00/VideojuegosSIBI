import { Component, OnInit } from '@angular/core';
import { videojuego } from 'src/app/models/videojuego';
import { DbConnectorService } from 'src/app/services/db-connector.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public videogames: videojuego[] = [];
  constructor(private service: DbConnectorService) {}
  ngOnInit(): void {
    this.service.getVideojuegos().then((res) => {
      let maxValue = 1;
      this.videogames = res.map((game: videojuego) => {
        game.ranking =
          2 * parseInt(game.favorito) +
          parseInt(game.like) -
          parseInt(game.dislike);
        if (!game.ranking || game.ranking < 0) {
          game.ranking = 0;
        }
        if (game.ranking > maxValue) {
          maxValue = game.ranking + 1;
        }
        return game;
      });
      this.videogames = res.map((game: videojuego) => {
        game.ranking = Math.round((game.ranking / maxValue) * 100) / 10;
        return game;
      });
      this.videogames = this.videogames.sort((a, b) => {
        if (a.ranking > b.ranking) {
          return -1;
        } else {
          return 1;
        }
      });
      this.videogames = this.videogames.slice(0, 10);
    });
  }
}
