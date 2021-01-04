import { IImage } from './image';

export interface IArtist {
  id: string;
  name: string;
	genres: [];
	images: IImage[];
}

export class Artist implements IArtist {
  id: string;
  name: string;
	genres: [];
	images: IImage[];
}
