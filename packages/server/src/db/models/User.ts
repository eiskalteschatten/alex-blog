import { Model, CreationOptional } from 'sequelize';
import { AllowNull, AutoIncrement, Column, CreatedAt, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export default class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Unique(true)
  @Column
  id: CreationOptional<number>;

  @Unique(true)
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  password: string;

  @CreatedAt
  createdAt: CreationOptional<Date>;

  @UpdatedAt
  updatedAt: CreationOptional<Date>;
}
