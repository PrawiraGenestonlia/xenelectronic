import { getAllCategories, createCategory } from '../../app/categories/categories.service';
import { getAllProducts, createProduct } from '../../app/products/products.service';

import { INIT_CATEGORIES } from './initials/categories.initial';
import { INIT_PRODUCTS } from './initials/products.initial';

export const seedCategory = async () => {
  const foundCategories = await getAllCategories();
  if (foundCategories?.length === 0) {
    for (let i = 0; i < INIT_CATEGORIES.length; i++) {
      await createCategory(INIT_CATEGORIES[i]);
    }
    console.log('Categories are seeded.');
  }
}

export const seedProduct = async () => {
  const foundProducts = await getAllProducts();
  if (foundProducts?.length === 0) {
    for (let i = 0; i < INIT_PRODUCTS.length; i++) {
      await createProduct(INIT_PRODUCTS[i]);
    }
    console.log('Products are seeded.');
  }
}

export const seeding = async () => {
  await seedCategory().catch(console.error);
  await seedProduct().catch(console.error);

}