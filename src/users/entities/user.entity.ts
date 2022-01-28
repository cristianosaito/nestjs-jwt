import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export enum userStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum userRole {
  Admin = 'admin',
  User = 'user',
}

@Table({
  tableName: 'users',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
})
export class User extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.CHAR(150), allowNull: false })
  name: string;

  @Column({ type: DataType.CHAR(150), allowNull: false })
  username: string;

  @Column({ type: DataType.CHAR(150), allowNull: false })
  password: string;

  @Column({ allowNull: false, defaultValue: userStatus.Active })
  status: userStatus;

  @Column({ allowNull: false, defaultValue: userRole.User })
  role: userRole;
}
