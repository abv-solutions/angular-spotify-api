import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'artist/:id', component: ArtistComponent },
	{ path: 'album/:id', component: AlbumComponent },
	{ path: '**', redirectTo: '/'}
];

export const AppRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot(
  routes
);
