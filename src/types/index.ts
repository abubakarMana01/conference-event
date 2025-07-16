export interface PaginatedResponse<T> {
	data: T;
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export interface User {
	id: number;
	documentId: string;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	userType: string;
	organisation: string;
	category: string;
	checkedIn: boolean;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	transactionRef: null;
	geoZone: null;
	state: string;
	country: string;
	phone: string;
	passcode: string;
	paidAt: null;
}

export interface ImageFormats {
	[key: string | 'medium' | 'large' | 'thumbnail' | 'small']: {
		url: string;
		name: string;
	};
}

export interface ISpeaker {
	id: number;
	documentId: string;
	fullname: string;
	title: string;
	profile: string;
	order?: number;
	speakerType?: string;
	image?: {
		id: number;
		documentId: string;
		name: string;
		width: number;
		height: number;
		formats: ImageFormats;
		url: string;
	};
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface IAbstract {
	id: number;
	documentId: string;
	name: string;
	email: string;
	phone: string;
	category: string;
	organisation: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	title: string;
	abstract: {
		id: number;
		documentId: string;
		name: string;
		formats: ImageFormats;
		url: string;
		previewUrl: null | string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
	};
	coAuthors: [];
}

export interface IAnnouncement {
	id: number;
	documentId: string;
	delivery_option: string;
	description: string;
	order: number;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface ISponsor {
	id: number;
	documentId: string;
	name: string;
	description: string;
	category: string;
	url: string;
	image?: {
		id: number;
		documentId: string;
		name: string;
		width: number;
		height: number;
		formats: ImageFormats;
		url: string;
	};
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface ISchedule {
	id: number;
	documentId: string;
	title: string;
	day: string;
	date: string;
	order: number;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	agenda: {
		id: number;
		time: string;
		title: string;
		detail: string;
	}[];
}

export interface ISession {
	id: number;
	documentId: string;
	title: string;
	link: string;
	order: number;
	anchors: string;
	time: string;
	endtime: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	state: string;
}
