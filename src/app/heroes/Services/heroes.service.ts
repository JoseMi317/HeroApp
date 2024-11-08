import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../Interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl : string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  getHerobyId(id: string) : Observable<Hero|undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError( error => of(undefined))
      )

  }

  getSuggestions(query : string) : Observable <Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=3`);
  }

}
