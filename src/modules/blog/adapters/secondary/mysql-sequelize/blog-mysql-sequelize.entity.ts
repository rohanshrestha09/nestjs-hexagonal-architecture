import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Blog } from 'src/modules/blog/domain/blog.domain';
import { MySQLSequelizeUserEntity } from 'src/modules/user/adapters/secondary/mysql-sequelize/user-mysql-sequelize.entity';

@Table({ tableName: 'blog', modelName: 'blog' })
export class MySQLSequelizeBlogEntity extends Model implements Blog {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  slug: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @Column({ type: DataType.DATE, allowNull: false })
  @CreatedAt
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  @UpdatedAt
  updatedAt: Date;

  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @BelongsTo(() => MySQLSequelizeUserEntity, 'userId')
  user: MySQLSequelizeUserEntity;
}

export default MySQLSequelizeBlogEntity;
