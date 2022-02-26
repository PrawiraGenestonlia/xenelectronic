import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Role } from './role';
import { Cart } from './cart';
@Entity({ name: 'users' })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Role, (role: Role) => role.user, { onDelete: 'CASCADE' })
  roles: Role[];

  @OneToMany(() => Cart, (cart: Cart) => cart.product, { onDelete: 'CASCADE' })
  carts: Cart[];

}