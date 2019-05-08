import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SuperHeroesDashboardComponent } from './containers/superheroes-dashboard/superheroes-dashboard.component';
import { SuperHeroesCountComponent } from './components/superheroes-count/superheroes-count.component';
import { SuperHeroesDetailComponent } from './components/superheroes-detail/superheroes-detail.component';
import { SuperHeroesFormComponent } from './components/superheroes-form/superheroes-form.component';
import { SuperHeroesDashboardService } from './services/superheroes-dashboard.service';
import { SuperHeroesViewerComponent } from './containers/superheroes-viewer/superheroes-viewer.component';

const routes: Routes = [
    {
        path: 'superheroes',
        children: [
            {
                path: '',
                component: SuperHeroesDashboardComponent
            },
            {
                path: ':id',
                component: SuperHeroesViewerComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SuperHeroesDashboardComponent,
        SuperHeroesViewerComponent,
        SuperHeroesCountComponent,
        SuperHeroesDetailComponent,
        SuperHeroesFormComponent
    ],
    providers: [
        SuperHeroesDashboardService
    ]
})
export class SuperHeroesDashboardModule {

}
