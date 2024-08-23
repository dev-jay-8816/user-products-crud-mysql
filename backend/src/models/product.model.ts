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

import { ProductAttributes } from '@/interfaces/model/product.interface';
import User from './user.model';


@Table({
    timestamps: true,
    paranoid: true,
    tableName: 'products',
    indexes: [],
})
export default class Product extends Model<ProductAttributes> implements ProductAttributes {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    })
    id: number;

    @Column(DataTypes.STRING)
    title: string;

    @Column(DataTypes.STRING)
    description: string;

    @Column(DataTypes.STRING)
    image_url: string;

    @Column({ type: DataTypes.BOOLEAN, defaultValue: true })
    is_enabled: boolean;

    @Column({ type: DataTypes.DATE })
    published_date: Date;

    @Column
    @ForeignKey(() => User)
    user_id: number;

    @BelongsTo(() => User, { constraints: false, as: 'userData', foreignKey: 'user_id' })
    userData: User;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;


    readonly toJSON = () => {
        const values = { ...this.get() };
        return values;
    };
}
