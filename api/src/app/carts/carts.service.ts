/* Cart service
 * Originally written by Prawira Genestonlia
 * Created on 26 Feb 2022
 */

import { Cart } from '@entity/cart';
import { User } from '@entity/user';
import { Product } from '@entity/product';

export interface ICart {
  name: string,
  productName: string,
}

export const getAllCarts = async () => {
  return await Cart.find({ relations: ['user', 'product'] });
}

export const getUserCart = async (name: string) => {
  const _foundUser = await User.findOne({ where: { name } });
  if (!_foundUser) throw new Error('User is not found!');

  return await Cart.find({ where: { user: _foundUser }, relations: ['user', 'product'] });
}

export const addToCart = async (body: ICart) => {
  const _foundUser = await User.findOne({ where: { name: body.name } });
  if (!_foundUser) throw new Error('User is not found!');
  const _foundProduct = await Product.findOne({ where: { productName: body.productName } });
  if (!_foundProduct) throw new Error('Product is not found!');

  const _newCart = new Cart();
  _newCart['user'] = _foundUser;
  _newCart['product'] = _foundProduct;

  return await _newCart.save();
}

export const removeFromCart = async (body: ICart) => {
  const _foundUser = await User.findOne({ where: { name: body.name } });
  if (!_foundUser) throw new Error('User is not found!');
  const _foundProduct = await Product.findOne({ where: { productName: body.productName } });
  if (!_foundProduct) throw new Error('Product is not found!');

  const _foundCart = await Cart.findOne({ where: { user: _foundUser, product: _foundProduct } });
  return await _foundCart?.remove();
}

export const checkoutFromCart = async (name: string) => {
  const _foundUser = await User.findOne({ where: { name: name } });
  if (!_foundUser) throw new Error('User is not found!');

  const _foundCarts = await Cart.find({ where: { user: _foundUser } });

  for (let i = 0; i < _foundCarts.length; i++) {
    await _foundCarts[i].remove();
  }

  return { status: 'successful', message: 'You have successfully checkout from' };
}