/* Carts Router
 * Originally written by Prawira Genestonlia
 * Created on 26 Feb 2022
 */

import { Body, Controller, Delete, Get, Post, Put, Path, Route, Tags } from 'tsoa';
import { ICart, addToCart, checkoutFromCart, getAllCarts, getUserCart, removeFromCart } from './carts.service';

@Tags('Carts')
@Route('/api/carts')
export class CartController extends Controller {

  @Get('/')
  public async getAllCarts() {
    return getAllCarts()
  }

  @Get('/{name}')
  public async getUserCart(@Path('name') name: string) {
    return getUserCart(name)
  }

  @Post('/add')
  public async addToCart(@Body() body: ICart) {
    return addToCart(body);
  }

  @Post('/remove')
  public async removeFromCart(@Body() body: ICart) {
    return removeFromCart(body);
  }

  @Post('/checkout/{name}')
  public async checkoutFromCart(@Path('name') name: string) {
    return checkoutFromCart(name);
  }

}

