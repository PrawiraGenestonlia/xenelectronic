import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category';
import { Cart } from './cart';

@Entity({ name: 'products' })
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (categories: Category) => categories.categoryName, { onDelete: 'CASCADE' })
  categoryName: Category;

  @OneToMany(() => Cart, (carts: Cart) => carts.id, { onDelete: 'CASCADE' })
  carts: Cart;

  @Column({ unique: true, length: 255 })
  productName: string;

  @Column({ nullable: true, length: 500 })
  previewImageUrl: string;

  @Column({ nullable: true, length: 500 })
  description: string;

  @Column()
  postedDate: Date;

  @Column()
  price: number;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ nullable: true, default: null })
  discountPercentage: number;

  @Column({ nullable: true, default: null })
  discountEndDate: Date;

}