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
  public async getAllCategories(): Promise<Array<ICategory & { id: number }>> {
    return getAllCategories()
  }

  @Get('/{categoryName}')
  public async getCategory(@Path('categoryName') categoryName: string): Promise<Array<ICategory & { id: number }>> {
    return getCategory(categoryName)
  }

  @Post('/')
  public async createCategory(@Body() body: ICategory): Promise<ICategory & { id: number }> {
    return createCategory(body);
  }

  @Put('/{id}')
  public async updateCategory(@Path('id') id: string, @Body() body: ICategory): Promise<ICategory & { id: number } | {
    message: string;
  }> {
    return updateCategory({ id: Number(id), body });
  }

  @Delete('/{id}')
  public async deleteCategory(@Path('id') id: string): Promise<{ message: string; }> {
    return deleteCategory({ id: Number(id) });
  }

}

