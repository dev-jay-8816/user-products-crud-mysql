import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const {
	NODE_ENV,
	PORT,
	DATABASE_URL,
	SECRET_KEY,
	SERVER_URL,
	ORIGIN,
	API_URL,
	JWT_SECRET,
	FRONTEND_URL,
} = process.env;
