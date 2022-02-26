import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Product } from './product';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  categoryName: string;

  @Column({ nullable: true, length: 500 })
  categoryDescription: string;

  @Column({ nullable: true, length: 500 })
  categoryImageUrl: string;

  @OneToMany(() => Product, (products) => products.categoryName, { onDelete: 'CASCADE', nullable: true })
  products: Product;

}