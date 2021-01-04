import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify/spotify.service';

import { IToken } from 'src/app/models/token';
import { IArtist, Artist } from 'src/app/models/artist';
import { IAlbum } from 'src/app/models/album';

@Component({
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit, OnDestroy {
  artist: IArtist = new Artist();
	albums: IAlbum[];
	paramSub: Subscription;
	tokenSub: Subscription;
	albumsSub: Subscription;
	artistSub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _spotify: SpotifyService
  ) {}

  ngOnInit(): void {
    this.paramSub = this._route.params.subscribe((params) => {
      this.artist.id = params['id'];
    });

    this.tokenSub = this._spotify.getToken().subscribe((token: IToken) => {
			this._spotify.token = token;
			
			this.artistSub = this._spotify
				.getArtist(this.artist.id)
				.subscribe((artist: Artist) => {
        	this.artist = artist;
			});
			
			this.albumsSub = this._spotify
				.getAlbums(this.artist.id)
				.subscribe((albums: IAlbum[]) => {
					this.albums = albums.filter(
						(a, i, albums) =>
							albums.findIndex(
								b => b.name.toLowerCase() === a.name.toLowerCase()
							) === i
					);
      });
    });
	}
	
	ngOnDestroy(): void {
		this.paramSub.unsubscribe();
		this.albumsSub.unsubscribe();
		this.artistSub.unsubscribe();
		this.tokenSub.unsubscribe();
	}
}
