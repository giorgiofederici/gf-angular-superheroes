import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuperHero } from '../models/superhero.interface';

const SUPERHEROES_API = 'http://localhost:3000/api/superheroes';

@Injectable()
export class SuperHeroesDashboardService {

    constructor(private httpClient: HttpClient) { }

    getSuperHeroes(): Observable<SuperHero[]> {
        return this.httpClient.get<SuperHero[]>(SUPERHEROES_API);
    }

    getSuperHero(id: number): Observable<SuperHero> {
        return this.httpClient.get<SuperHero>(`${SUPERHEROES_API}/${id}`);
    }

    updateSuperHero(superHero: SuperHero): Observable<SuperHero> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.httpClient.put<SuperHero>(`${SUPERHEROES_API}/${superHero.id}`, superHero, httpOptions);
    }

    removeSuperHero(superHero: SuperHero): Observable<SuperHero> {
        return this.httpClient.delete<SuperHero>(`${SUPERHEROES_API}/${superHero.id}`);
    }

}