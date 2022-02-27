/* Products service
 * Originally written by Prawira Genestonlia
 * Created on 26 Feb 2022
 */

import { Product } from '@entity/product';
import { Category } from '@entity/category';

export interface IProduct {
  categoryName: string;
  productName: string;
  previewImageUrl: string;
  description: string;
  postedDate: Date;
  price: number;
  isAvailable: boolean;
  discountPercentage: number;
  discountEndDate: Date | null;
}

export const getAllProducts = async () => {
  return await Product.find({ relations: ['categoryName'] });
}

export const getAllProductsFromACategory = async (categoryName: string) => {
  const _foundCategory = await Category.findOne({ where: { categoryName } })
  return await Product.find({ where: { categoryName: _foundCategory } });
}

export const getProduct = async (productName: string) => {
  return await Product.findOne({ where: { productName }, relations: ['categoryName'] });
}

export const createProduct = async (body: IProduct) => {
  const _foundCategory = await Category.findOne({ where: { categoryName: body.categoryName } });
  if (!_foundCategory) throw new Error('Category does not exist. Please create the category first');

  const _newProduct = new Product();
  _newProduct['categoryName'] = _foundCategory;
  _newProduct['productName'] = body.productName;
  _newProduct['previewImageUrl'] = body.previewImageUrl;
  _newProduct['description'] = body.description;
  _newProduct['postedDate'] = body.postedDate;
  _newProduct['price'] = body.price;
  _newProduct['isAvailable'] = body.isAvailable;
  _newProduct['discountPercentage'] = body.discountPercentage;
  if (body.discountEndDate) _newProduct['discountEndDate'] = body.discountEndDate;

  return await _newProduct.save();
}

export const updateProduct = async ({ id, body }: { id: number, body: IProduct }) => {
  const _foundCategory = await Category.findOne({ where: { categoryName: body.categoryName } });
  if (!_foundCategory) throw new Error('Category does not exist. Please create the category first');

  const _foundProduct = await Product.findOne({ where: { id } });
  if (!_foundProduct) throw new Error('Product does not exist.');

  _foundProduct['categoryName'] = _foundCategory;
  _foundProduct['productName'] = body.productName;
  _foundProduct['previewImageUrl'] = body.previewImageUrl;
  _foundProduct['description'] = body.description;
  _foundProduct['postedDate'] = body.postedDate;
  _foundProduct['price'] = body.price;
  _foundProduct['isAvailable'] = body.isAvailable;
  _foundProduct['discountPercentage'] = body.discountPercentage;
  if (body.discountEndDate) _foundProduct['discountEndDate'] = body.discountEndDate;

  return await _foundProduct.save();
}

export const deleteProduct = async ({ id }: { id: number }) => {
  const _foundProduct = await Product.findOne({ id: id });
  await _foundProduct?.remove();
  return { message: 'Deleted.' }
}