import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SuperHero } from '../../models/superhero.interface';
import { Agency } from '../../models/agency.interface';

@Component({
    selector: 'superheroes-form',
    styleUrls: ['./superheroes-form.component.scss'],
    template: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>

      <div>
        Superhero name:
        <input
          type="text"
          name="fullname"
          required
          #fullname="ngModel"
          [ngModel]="detail?.fullname">
        <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
          Superhero name is required
        </div>
      </div>

      <div>
        Superhero ID:
        <input
          type="number"
          name="id"
          required
          #id="ngModel"
          [ngModel]="detail?.id">
        <div *ngIf="id.errors?.required && id.dirty" class="error">
          Superhero ID is required
        </div>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="available"
            [ngModel]="detail?.available"
            (ngModelChange)="toggleAvailability($event)">
        </label>
      </div>

      <div *ngIf="form.value.available">
        Last appearance date:
        <input
          type="number"
          name="lastAppearanceDate"
          [ngModel]="detail?.lastAppearanceDate">
      </div>

      <div>
        Agency:
        <select
          name="agency"
          [ngModel]="detail?.agency">
          <option
            *ngFor="let item of agencies"
            [value]="item.key"
            [selected]="item.key === detail?.agency">
            {{ item.value }}
          </option>
        </select>
      </div>

      <button type="submit" [disabled]="form.invalid">
        Update Superhero
      </button>

    </form>
  `
})
export class SuperHeroesFormComponent {

    @Input()
    detail: SuperHero;

    @Output()
    update: EventEmitter<SuperHero> = new EventEmitter<SuperHero>();

    agencies: Agency[] = [{
        key: 'none',
        value: 'No agency'
    }, {
        key: 'blue',
        value: 'Blue agency'
    }, {
        key: 'red',
        value: 'Red agency'
    }, {
        key: 'yellow',
        value: 'Yellow agency'
    }];

    toggleAvailability(available: boolean) {
        if (available) {
            this.detail.lastAppearanceDate = Date.now();
        }
    }

    handleSubmit(superHero: SuperHero, isValid: boolean) {
        if (isValid) {
            this.update.emit(superHero);
        }
    }
}
