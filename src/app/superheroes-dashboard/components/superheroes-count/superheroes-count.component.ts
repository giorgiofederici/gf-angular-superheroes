import { Component, Input } from '@angular/core';
import { SuperHero } from '../../models/superhero.interface';

@Component({
    selector: 'superheroes-count',
    template: `
        <div>
        <h3>Superheroes!</h3>
        <div>
            Total availables: {{ availableCount() }}/{{ items?.length }}
        </div>
        </div>
    `
})
export class SuperHeroesCountComponent {
    @Input()
    items: SuperHero[];

    availableCount(): number {
        if (!this.items) {
            return;
        }
        return this.items.filter((superHero: SuperHero) => superHero.available).length;
    }

}
