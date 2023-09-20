import { CreationOptional } from 'sequelize';
import { AllowNull, AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'auth_sessions',
})
export default class AuthSession extends Model {
  @AutoIncrement
  @PrimaryKey
  @Unique(true)
  @Column
  override id: CreationOptional<number>;

  @Unique(true)
  @AllowNull(false)
  @Column
  token: string;

  @Unique(true)
  @AllowNull(false)
  @Column({
    field: 'token_type',
  })
  tokenType: string;

  @AllowNull(false)
  @Column
  expirationDate: Date;

  @CreatedAt
  override createdAt: CreationOptional<Date>;

  @UpdatedAt
  override updatedAt: CreationOptional<Date>;
}
