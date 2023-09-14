import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArtistComponent } from './artist.component';
import { AddArtistFormComponent } from './add-artist-form/add-artist-form.component';

@NgModule({
    declarations: [
        ArtistComponent,
        AddArtistFormComponent
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
export class ArtistModule { }
