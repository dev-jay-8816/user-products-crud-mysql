export interface UserAttributes {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    createdAt?: Date | string;
	updatedAt?: Date | string;
	deletedAt?: Date | string;
}