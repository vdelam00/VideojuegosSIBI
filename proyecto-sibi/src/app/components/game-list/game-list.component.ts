import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { videojuego } from 'src/app/models/videojuego';
import { DbConnectorService } from 'src/app/services/db-connector.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  public displayedColumns: string[] = [
    'nombre',
    'plataforma',
    'lanzamiento',
    'genero',
    'empresa',
    'puntuacionCritica',
    'puntuacionUsuario',
    'pegi',
    'likes',
    'dislikes',
    'favorito',
  ];
  public games = new MatTableDataSource<videojuego>([]);
  public search = new FormControl<string>('');
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service: DbConnectorService) {}
  public getVideojuegos() {
    this.service.getVideojuegos().then((res) => {
      res = res.map((game: videojuego) => {
        game.like = game.like ? game.like : '0';
        game.dislike = game.dislike ? game.dislike : '0';
        game.liked = false;
        game.disliked = false;
        game.fav = false;
        return game;
      });
      this.games = new MatTableDataSource<videojuego>(res);
      this.games.paginator = this.paginator;
      this.games.sort = this.sort;
    });
  }
  public likeGame(game: videojuego) {
    game.liked = true;
    game.like = (parseInt(game.like) + 1).toString();
    if (game.disliked) {
      game.dislike = (parseInt(game.dislike) - 1).toString();
      game.disliked = false;
    }
    this.service.setVideojuego(game).then((res) => {
      // this.getVideojuegos();
    });
  }
  public dislikeGame(game: videojuego) {
    game.disliked = true;
    game.dislike = (parseInt(game.dislike) + 1).toString();
    if (game.liked) {
      game.like = (parseInt(game.like) - 1).toString();
      game.liked = false;
    }
    this.service.setVideojuego(game).then((res) => {
      // this.getVideojuegos();
    });
  }
  public favGame(game: videojuego) {
    game.fav = true;
    game.favorito = (parseInt(game.favorito) + 1).toString();
    this.service.setVideojuego(game).then((res) => {
      // this.getVideojuegos();
    });
  }
  public unfavGame(game: videojuego) {
    game.fav = false;
    game.favorito = (parseInt(game.favorito) - 1).toString();
    this.service.setVideojuego(game).then((res) => {
      // this.getVideojuegos();
    });
  }
  public applyFilter(search: string) {
    this.games.filter = search.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.getVideojuegos();
    this.search.valueChanges.subscribe((res) => {
      this.applyFilter(this.search.value ? this.search.value : '');
    });
  }
}
