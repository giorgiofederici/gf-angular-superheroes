import { Component, OnInit } from '@angular/core';
import { SuperHero } from '../../models/superhero.interface';
import { SuperHeroesDashboardService } from '../../services/superheroes-dashboard.service';

@Component({
    selector: 'superheroes-dashboard',
    styleUrls: ['./superheroes-dashboard.component.scss'],
    template: `
        <div>
            <superheroes-count [items]="superHeroes"></superheroes-count>
            <div *ngFor="let superHero of superHeroes">
                {{ superHero.fullname }}
            </div>
            <superheroes-detail *ngFor="let superHero of superHeroes"
              [detail]="superHero"
              (edit)="handleEdit($event)"
              (remove)="handleRemove($event)">
            </superheroes-detail>
        </div>
    `
})
export class SuperHeroesDashboardComponent implements OnInit {

    superHeroes: SuperHero[];

    constructor(private superHeroesDashboardService: SuperHeroesDashboardService) { }

    ngOnInit() {
        this.superHeroesDashboardService.getSuperHeroes().subscribe((data: SuperHero[]) => {
            this.superHeroes = data;
        });
    }

    handleEdit(event: SuperHero): void {
        this.superHeroesDashboardService.updateSuperHero(event).subscribe((data: SuperHero) => {
            this.superHeroes = this.superHeroes.map((superHero: SuperHero) => {
                if (superHero.id === event.id) {
                    superHero = Object.assign({}, superHero, event);
                }
                return superHero;
            });
        });
    }

    handleRemove(event: SuperHero): void {
        this.superHeroesDashboardService.removeSuperHero(event).subscribe((data: SuperHero) => {
            this.superHeroes = this.superHeroes.filter((superHero: SuperHero) => {
                return superHero.id !== event.id;
            });
        });
    }
}
