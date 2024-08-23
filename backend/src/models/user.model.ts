import { DataTypes } from 'sequelize';
import {
	BeforeCreate,
	BeforeUpdate,
	BelongsTo,
	Column,
	CreatedAt,
	DeletedAt,
	ForeignKey,
	HasMany,
	HasOne,
	Model,
	Table,
	UpdatedAt,
} from 'sequelize-typescript';


import { passwordHook } from '../hooks/user.hook';
import { UserAttributes } from '@/interfaces/model/user.interface';
import Product from './product.model';

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'users',
	indexes: [],
})
export default class User extends Model<UserAttributes> implements UserAttributes  {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	})
	id: number;

    @Column(DataTypes.STRING)
    first_name: string;

    @Column(DataTypes.STRING)
    last_name: string;

    @Column(DataTypes.STRING)
    email: string;

    @Column(DataTypes.STRING)
    password: string;

	@CreatedAt
	createdAt: Date;

	@UpdatedAt
	updatedAt: Date;

	@DeletedAt
	deletedAt: Date;

	@HasMany(() => Product, {constraints: false, as: 'productData', foreignKey: 'user_id'})
	productData?: Product[];

	@BeforeCreate
	@BeforeUpdate
	static beforeCreateHook = async (user: User) => {
		await passwordHook(user);
	};

	readonly toJSON = () => {
		const values = { ...this.get() };
		return values;
	};
}
