import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { SuperHero } from '../../models/superhero.interface';

@Component({
    selector: 'superheroes-detail',
    styleUrls: ['./superheroes-detail.component.scss'],
    template: `
        <div>
        <span class="status" [class.available]="detail.available"></span>
        <div *ngIf="editing">
            <input
            type="text"
            [value]="detail.fullname"
            (input)="onNameChange(name.value)"
            #name>
        </div>
        <div *ngIf="!editing">
            {{ detail.fullname }}
        </div>
        <div class="date">
            Last appearance date:
            {{ detail.available ? (detail.lastAppearanceDate | date: 'yMMMMd' | uppercase) : 'Never appeared!' }}
        </div>
        <button (click)="toggleEdit()">
            {{ editing ? 'Done' : 'Edit' }}
        </button>
        <button (click)="onRemove()">
            Remove
        </button>
        </div>
    `
})
export class SuperHeroesDetailComponent implements OnChanges {

    @Input()
    detail: SuperHero;

    @Output()
    edit: EventEmitter<SuperHero> = new EventEmitter<SuperHero>();

    @Output()
    remove: EventEmitter<SuperHero> = new EventEmitter<SuperHero>();

    editing: boolean = false;

    constructor() { }

    ngOnChanges(changes) {
        if (changes.detail) {
            this.detail = Object.assign({}, changes.detail.currentValue);
        }
    }

    onNameChange(value: string) {
        this.detail.fullname = value;
    }

    toggleEdit() {
        if (this.editing) {
            this.edit.emit(this.detail);
        }
        this.editing = !this.editing;
    }
    onRemove() {
        this.remove.emit(this.detail);
    }
}
