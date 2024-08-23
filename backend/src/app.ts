import { NODE_ENV, PORT } from '@config';
import express from 'express';
import http from 'http'
import cors from 'cors'

import { Routes } from '@interfaces/routes.interface';
import { UserAttributes } from './interfaces/model/user.interface';
import errorMiddleware from './middlewares/error.middleware';
import db from './models';
import User from './models/user.model';
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface Request {
			user:  User;
		}
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		// interface User extends UserAttributes {}
	}
}

class App {
	public app: express.Application;
	public env: string;
	public port: string | number;
	private server?: http.Server;

	constructor(routes: Routes[]) {
        console.warn("PORT: ", PORT);
        
		this.app = express();
		this.env = NODE_ENV || 'development';
		this.port = PORT || 8009;
		this.initializeMiddleware();
		this.initDb();
		this.initializeRoutes(routes);
		this.initializeErrorHandling();
		this.createServer();
	}

	public listen = async () => {
		this.server.listen(this.port, () => {
			console.log(`🚀 App listening on the port ${this.port}`);
		});
	};

	public getServer() {
		return this.app;
	}

	private initializeMiddleware() {
		this.app.use(cors());
		this.app.use('/', express.static('public'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private initializeRoutes(routes: Routes[]) {
		routes.forEach((route) => {
			this.app.use('/', route.router);
		});
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	private initDb = () => {
		db.authenticate().then(() => {
			console.log("DB Connected Succussfully.")
		})
	}

	private createServer(): void {
		this.server = http.createServer(this.app);
	}

}

export default App;