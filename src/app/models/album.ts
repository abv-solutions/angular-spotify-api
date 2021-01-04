import { IImage } from './image';
import { IArtist } from './artist';
import { IItem } from './item';
import { ExtUrl } from './extUrl';

export interface IAlbum {
  id: string;
  name: string;
	release_date: Date;
	images: IImage[];
	artists: IArtist[];
	tracks: {
		items: IItem[];
	}
	external_urls: ExtUrl;
}

export class Album implements IAlbum {
  id: string;
  name: string;
	release_date: Date;
	images: IImage[];
	artists: IArtist[];
	tracks: {
		items: IItem[];
	}
	external_urls: ExtUrl;
}
