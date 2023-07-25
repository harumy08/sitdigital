import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.model';
import { SubSink } from 'subsink';
// Importar SubSink y utilizarlo para manejar las suscripciones

import { NgxSpinnerService } from "ngx-spinner";
//se utiliza un spinner para esperar la respuestas del servicio
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {
  category: string = '';
  games: Game[] = [];
  newGames: Game[] = [];
  errorMessage: string = '';
  private subs = new SubSink();


  constructor(private gameService: GameService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    this.getGames();
  }

  getGames() {//Se consume el servicio que devuelve todos los juegos
    this.subs.sink = this.gameService.getAllGames().subscribe(
      (games) => {
        this.games = games.slice(0, 12);
        //Devuelve un nuevo array que contiene los elementos desde el índice 0 hasta el índice 11
        //(los primeros 12 elementos) del array original, para no saturar la vista inicial
        this.errorMessage = '';
        this.spinner.hide();
      },
      (error) => {
        this.errorMessage = error.error.status_message;
        console.error(error);
        this.spinner.hide();
      }
    );
  }

  //Se consume el servicio que devuelve juegos para categorías
  changeGameList(newGames: Game[]) {
    this.games = [];//se limpia array de los juegos para mostrar los nuevos
    this.subs.sink = this.gameService.searchGames(this.category).subscribe(
      (newGames) => {
        this.games = newGames;
        this.errorMessage = '';
        this.spinner.hide();
      },
      (error) => {
        this.errorMessage = error.error.status_message;
        console.error(error);
        this.spinner.hide();
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    // Desuscribir todas las suscripciones al destruir el componente
  }

}

//Componente para mostrar la lista de juegos, es un componente padre
//que renderiza los datos y los manda al componente hijo
//Primero consume el servicio que trae todos los servicios para que
//sea mas comodo para el usuario
//despues cambia la lista de los juegos dependiendo de lo que busque el usuario
