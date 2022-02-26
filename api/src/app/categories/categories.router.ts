/* Categories Router
 * Originally written by Prawira Genestonlia
 * Created on 26 Feb 2022
 */

import { Body, Controller, Delete, Get, Post, Put, Path, Route, Tags } from 'tsoa';
import { ICategory, createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from './categories.service';

@Tags('Categories')
@Route('/api/categories')
export class CategoryController extends Controller {

  @Get('/')
  public async getAllCategories() {
    return getAllCategories()
  }

  @Get('/{categoryName}')
  public async getCategory(@Path('categoryName') categoryName: string) {
    return getCategory(categoryName)
  }

  @Post('/')
  public async createCategory(@Body() body: ICategory) {
    return createCategory(body);
  }

  @Put('/{id}')
  public async updateCategory(@Path('id') id: string, @Body() body: ICategory) {
    return updateCategory({ id: Number(id), body });
  }

  @Delete('/{id}')
  public async deleteCategory(@Path('id') id: string) {
    return deleteCategory({ id: Number(id) });
  }

}

