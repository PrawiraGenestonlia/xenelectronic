/* Products router
 * Originally written by Prawira Genestonlia
 * Created on 26 Feb 2022
 */

import { Body, Controller, Delete, Get, Post, Put, Path, Route, Tags } from 'tsoa';
import { ICategory } from '../categories/categories.service';
import { IProduct, createProduct, deleteProduct, getAllProducts, getAllProductsFromACategory, getProduct, updateProduct } from './products.service';


@Tags('Products')
@Route('/api/products')
export class ProductController extends Controller {

  @Get('/')
  public async getAllProducts(): Promise<Array<IProduct & { id: number, categoryName: ICategory & { id: number } }>> {
    return getAllProducts() as never
  }

  @Get('/{productName}')
  public async getProduct(@Path('productName') productName: string): Promise<IProduct & { id: number, categoryName: ICategory & { id: number } }> {
    return getProduct(productName) as never
  }

  @Get('/category/{categoryName}')
  public async getAllProductsFromACategory(@Path('categoryName') categoryName: string): Promise<Array<IProduct & { id: number, categoryName: ICategory & { id: number } }>> {
    return getAllProductsFromACategory(categoryName) as never
  }

  @Post('/')
  public async createProduct(@Body() body: IProduct): Promise<IProduct & { id: number }> {
    return createProduct(body) as never
  }

  @Put('/{id}')
  public async updateProduct(@Path('id') id: string, @Body() body: IProduct): Promise<IProduct & { id: number }> {
    return updateProduct({ id: Number(id), body }) as never
  }

  @Delete('/{id}')
  public async deleteProduct(@Path('id') id: string): Promise<{ message: string }> {
    return deleteProduct({ id: Number(id) });
  }

}

