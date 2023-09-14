import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { AddItemFormComponent } from './components/items/add-item-form/add-item-form.component';
import { ItemsComponent } from './components/items/items.component';
import { RequireAuthenticatedUserRouteGuard } from './shared/required-auth.guard';
import { ArtistComponent } from './components/artist/artist.component';
import { GenreComponent } from './components/genre/genre.component';
import { AddArtistFormComponent } from './components/artist/add-artist-form/add-artist-form.component';
import { AddGenreFormComponent } from './components/genre/add-genre-form/add-genre-form.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemsComponent, canActivate: [RequireAuthenticatedUserRouteGuard] },
  { path: 'artists', component: ArtistComponent, canActivate: [RequireAuthenticatedUserRouteGuard] },
  { path: 'genres', component: GenreComponent, canActivate: [RequireAuthenticatedUserRouteGuard] },
  { path: 'items/add-item', component: AddItemFormComponent, canActivate: [RequireAuthenticatedUserRouteGuard] },
  { path: 'artists/add-artist', component: AddArtistFormComponent, canActivate: [RequireAuthenticatedUserRouteGuard] },
  { path: 'genres/add-genre', component: AddGenreFormComponent, canActivate: [RequireAuthenticatedUserRouteGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'items' },
  { path: '**', redirectTo: 'items' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
