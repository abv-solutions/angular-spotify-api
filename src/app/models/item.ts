export interface IItem {
	name: string;
	track_number: string;
	preview_url: string;
}

export class Item implements IItem {
  name: string;
	track_number: string;
	preview_url: string;
}