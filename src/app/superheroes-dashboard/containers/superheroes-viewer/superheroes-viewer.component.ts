import { Component, OnInit } from '@angular/core';
import { SuperHero } from '../../models/superhero.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { SuperHeroesDashboardService } from '../../services/superheroes-dashboard.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'superheroes-viewer',
    styleUrls: ['superheroes-viewer.component.scss'],
    template: `
      <div>
        <superheroes-form
          [detail]="superHero"
          (update)="onUpdateSuperHero($event)">
        </superheroes-form>
      </div>
    `
  })
  export class SuperHeroesViewerComponent implements OnInit {
    superHero: SuperHero;
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private superHeroesDashboardService: SuperHeroesDashboardService
    ) {}
    ngOnInit() {
      this.route.params.pipe(
        switchMap((data: SuperHero) => this.superHeroesDashboardService.getSuperHero(data.id)))
        .subscribe((data: SuperHero) => this.superHero = data);
    }
    onUpdateSuperHero(event: SuperHero) {
        this.superHeroesDashboardService
        .updateSuperHero(event)
        .subscribe((data: SuperHero) => {
          this.superHero = Object.assign({}, this.superHero, event);
        });
    }
  }