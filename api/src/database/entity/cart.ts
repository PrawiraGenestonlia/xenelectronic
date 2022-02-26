import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { User } from './user';
import { Product } from './product';

@Entity({ name: 'carts' })
export class Cart extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (users: User) => users.roles, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, (products) => products.id, { onDelete: 'CASCADE' })
  product: Product;

}