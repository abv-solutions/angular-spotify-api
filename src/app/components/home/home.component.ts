import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../../services/spotify/spotify.service';

import { IToken } from 'src/app/models/token';
import { IArtist } from 'src/app/models/artist';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  searchTerm: string;
	artists: IArtist[];
	artistsSub: Subscription;
	tokenSub: Subscription;

  constructor(private _spotify: SpotifyService) {}

  ngOnInit(): void {
		this.tokenSub = this._spotify
			.getToken()
			.subscribe((token: IToken) => {
      	this._spotify.token = token;
    });
	}
	
  searchMusic() {
		if (this.searchTerm)
			this.artistsSub = this._spotify
				.searchArtists(this.searchTerm)
				.subscribe((artists: IArtist[]) => {
					this.artists = artists.slice(0, 5);
				});
		else
		this.artists = [];
  }
	
	ngOnDestroy(): void {
		this.artistsSub.unsubscribe();
		this.tokenSub.unsubscribe();
	}
}
