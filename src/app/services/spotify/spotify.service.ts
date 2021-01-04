import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IToken } from 'src/app/models/token';
import { IArtist } from 'src/app/models/artist';
import { IAlbum } from 'src/app/models/album';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private clientId = '56f3056aee024c789b3a354f1011f9f2';
  private clientSecret = '7d71fd5562104b94a0b7c66082cba665';
  private Url: string;
  private headers: HttpHeaders;
  private body: HttpParams;
  public token: IToken;

	constructor(private _http: HttpClient) {}
	
  getToken(): Observable<IToken> {
    this.Url = `https://accounts.spotify.com/api/token`;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(this.clientId + ':' + this.clientSecret)}`,
    });

    this.body = new HttpParams().set('grant_type', 'client_credentials');

    return this._http
      .post(this.Url, this.body, { headers: this.headers })
      .pipe(map((token: any) => token));
	}
	
  searchArtists(searchTerm: string): Observable<IArtist[]> {
    this.Url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token?.access_token}`,
		});
		
    return this._http
			.get(this.Url, { headers: this.headers })
      .pipe(map((res: any) => res.artists.items));
  }

  getArtist(id: string): Observable<IArtist> {
    this.Url = `https://api.spotify.com/v1/artists/${id}`;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token?.access_token}`,
    });
    return this._http
      .get(this.Url, { headers: this.headers })
      .pipe(map((res: any) => res));
  }

  getAlbums(id: string): Observable<IAlbum[]> {
    this.Url = `https://api.spotify.com/v1/artists/${id}/albums`;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token?.access_token}`,
    });

    return this._http
      .get(this.Url, { headers: this.headers })
      .pipe(map((res: any) => res.items));
  }

  getAlbum(id: string): Observable<IAlbum> {
    this.Url = `https://api.spotify.com/v1/albums/${id}`;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token?.access_token}`,
    });

    return this._http
      .get(this.Url, { headers: this.headers })
      .pipe(map((res: any) => res));
  }
}
