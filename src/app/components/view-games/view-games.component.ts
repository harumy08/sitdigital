import { Component, Input } from '@angular/core';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-view-games',
  templateUrl: './view-games.component.html',
  styleUrls: ['./view-games.component.scss']
})

export class ViewGamesComponent  {
  constructor() { }


  @Input() games: Game[] = [];
  isLoading: boolean = true;
  message: string = 'No games available in this Category.';

  dataLoaded() {
    this.isLoading = false;
  }



}
