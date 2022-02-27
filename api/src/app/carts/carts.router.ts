/* Carts Router
 * Originally written by Prawira Genestonlia
 * Created on 26 Feb 2022
 */

import { Body, Controller, Get, Post, Path, Route, Tags } from 'tsoa';
import { ICart, addToCart, checkoutFromCart, getAllCarts, getUserCart, removeFromCart } from './carts.service';

interface ICartResponse {
  'id': number,
  'user': {
    'id': number,
    'name': string
  },
  'product': {
    'id': number,
    'productName': string,
    'previewImageUrl': string,
    'description': string,
    'postedDate': Date,
    'price': number,
    'isAvailable': boolean,
    'discountPercentage': number,
    'discountEndDate': Date | null
  }
}
@Tags('Carts')
@Route('/api/carts')
export class CartController extends Controller {

  @Get('/')
  public async getAllCarts(): Promise<Array<ICartResponse>> {
    return getAllCarts()
  }

  @Get('/{name}')
  public async getUserCart(@Path('name') name: string): Promise<Array<ICartResponse>> {
    return getUserCart(name)
  }

  @Post('/add')
  public async addToCart(@Body() body: ICart): Promise<ICartResponse & { id: number }> {
    return addToCart(body);
  }

  @Post('/remove')
  public async removeFromCart(@Body() body: ICart): Promise<null> {
    return removeFromCart(body) as never;
  }

  @Post('/checkout/{name}')
  public async checkoutFromCart(@Path('name') name: string): Promise<{
    status: string;
    message: string;
  }> {
    return checkoutFromCart(name);
  }

}

