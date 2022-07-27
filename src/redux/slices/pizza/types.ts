export type Pizza = {
	id: string;
	imageUrl: string;
	price: number;
	rating: number;
	sizes: number[];
	types: number[];
	title: string;
};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
};

export interface PizzaSliceState {
	items: Pizza[];
	status: Status;
};

export type SearchPizzaParams = {
	order: string;
	sortBy: string;
	category: string;
	search: string;
	currentPage: string;
};
