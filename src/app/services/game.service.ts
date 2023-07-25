import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'https://www.freetogame.com/api/games';

  constructor(private http: HttpClient) {}

  searchGames(category: string): Observable<Game[]> {
    const url = `${this.apiUrl}?category=${category}`;
    return this.http.get<Game[]>(url);
  }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

}

//Servicio para consumir la API
