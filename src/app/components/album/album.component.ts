import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify/spotify.service';

import { IToken } from 'src/app/models/token';
import { IAlbum, Album } from 'src/app/models/album';

@Component({
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
	album: IAlbum = new Album();
	paramSub: Subscription;
	tokenSub: Subscription;
	albumSub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _spotify: SpotifyService
  ) {}

  ngOnInit(): void {
    this.paramSub = this._route.params.subscribe((params) => {
      this.album.id = params['id'];
    });

		this.tokenSub = this._spotify
			.getToken()
			.subscribe((token: IToken) => {
				this._spotify.token = token;
				this.albumSub = this._spotify
					.getAlbum(this.album.id)
					.subscribe((album: IAlbum) => {
						this.album = album;
				});
    });
	}
	
	ngOnDestroy(): void {
		this.paramSub.unsubscribe();
		this.albumSub.unsubscribe();
		this.tokenSub.unsubscribe();
	}
}
