/* Products router
 * Originally written by Prawira Genestonlia
 * Created on 26 Feb 2022
 */

import { Body, Controller, Delete, Get, Post, Put, Path, Route, Tags } from 'tsoa';
import { IProduct, createProduct, deleteProduct, getAllProducts, getAllProductsFromACategory, getProduct, updateProduct } from './products.service';


@Tags('Products')
@Route('/api/products')
export class ProductController extends Controller {

  @Get('/')
  public async getAllProducts() {
    return getAllProducts()
  }

  @Get('/{productName}')
  public async getProduct(@Path('productName') productName: string) {
    return getProduct(productName)
  }

  @Get('/category/{categoryName}')
  public async getAllProductsFromACategory(@Path('categoryName') categoryName: string) {
    return getAllProductsFromACategory(categoryName)
  }

  @Post('/')
  public async createProduct(@Body() body: IProduct) {
    return createProduct(body);
  }

  @Put('/{id}')
  public async updateProduct(@Path('id') id: string, @Body() body: IProduct) {
    return updateProduct({ id: Number(id), body });
  }

  @Delete('/{id}')
  public async deleteProduct(@Path('id') id: string) {
    return deleteProduct({ id: Number(id) });
  }

}

