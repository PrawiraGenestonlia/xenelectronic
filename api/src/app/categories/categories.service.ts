/* Categories service
 * Originally written by Prawira Genestonlia
 * Created on 26 Feb 2022
 */

import { Category } from '@entity/category';

export interface ICategory {
  categoryName: string,
  categoryDescription: string,
  categoryImageUrl: string
}

export const getAllCategories = async () => {
  try {
    return await Category.find();
  } catch (e) {
    console.error(e);
  }
}

export const getCategory = async (categoryName: string) => {
  try {
    return await Category.find({ where: { categoryName }, relations: ['products'] });
  } catch (e) {
    console.error(e);
  }
}

export const createCategory = async ({ categoryName, categoryDescription, categoryImageUrl }: ICategory) => {
  try {
    const _newCategory = new Category();
    _newCategory['categoryName'] = categoryName;
    _newCategory['categoryDescription'] = categoryDescription;
    _newCategory['categoryImageUrl'] = categoryImageUrl;

    return await _newCategory.save();

  } catch (e) {
    console.error(e);
  }
}

export const updateCategory = async ({ id, body }: { id: number, body: ICategory }) => {
  try {
    const _foundCategory = await Category.findOne({ where: { id } });
    if (!_foundCategory) return { message: 'Category is not found!' };

    _foundCategory['categoryName'] = body.categoryName;
    _foundCategory['categoryDescription'] = body.categoryDescription;
    _foundCategory['categoryImageUrl'] = body.categoryImageUrl;

    return await _foundCategory.save();

  } catch (e) {
    console.error(e);
  }
}

export const deleteCategory = async ({ id }: { id: number }) => {
  try {
    const _foundCategory = await Category.findOne({ id: id });
    return await _foundCategory?.remove();
  } catch (e) {
    console.error(e);
  }
}