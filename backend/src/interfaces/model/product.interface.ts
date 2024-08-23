export interface ProductAttributes {
    id: number;
    title: string;
    description: string;
    image_url?: string;
    is_enabled?: boolean;
    published_date: Date | string;
    user_id: number;
    createdAt?: Date | string;
	updatedAt?: Date | string;
	deletedAt?: Date | string;
}