import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenreComponent } from './genre.component';
import { AddGenreFormComponent } from './add-genre-form/add-genre-form.component';

@NgModule({
    declarations: [
        GenreComponent,
        AddGenreFormComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        SharedModule
    ],
    providers: [
        provideAnimations()
    ]
})
export class GenreModule { }
