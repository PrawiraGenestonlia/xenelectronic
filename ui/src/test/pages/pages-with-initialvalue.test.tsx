
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { storeInit } from '../../redux/store';
import { BrowserRouter } from 'react-router-dom';

import { LoginPage } from '../../pages/login';
import { HomePage } from '../../pages/home';
import { ProductPage } from '../../pages/products';
import { CartPage } from '../../pages/carts';
import { ProfilePage } from '../../pages/my-profile';
import { PaymentPage } from '../../pages/payment';
import { GET_MY_CART, GET_PRODUCT_LIST, GET_CATEGORIES } from '../mockData';

const Wrapper = (props: any) => <Provider store={storeInit({
  cart: { getMyCart: GET_MY_CART },
  user: { login: { name: 'prawira' } },
  categories: { getAllCategories: GET_CATEGORIES },
  products: { getAllProducts: GET_PRODUCT_LIST, getProductByCategory: GET_PRODUCT_LIST }
}).store}>
  <BrowserRouter>
    {props.children}
  </BrowserRouter>
</Provider>;

test('renders LoginPage', () => {
  const { container } = render(
    <Wrapper><LoginPage /></Wrapper>
  );
  const div = container.querySelector('div');
  const button = screen.getByRole('button', {
    name: /Login/i
  });
  button?.click();
  expect(div).toBeInTheDocument();
});

test('renders HomePage', () => {
  const { container } = render(
    <Wrapper><HomePage /></Wrapper>
  );
  const div = container.querySelector('div');
  expect(div).toBeInTheDocument();
});

test('renders CartPage', () => {
  const { container } = render(
    <Wrapper><CartPage /></Wrapper>
  );
  const div = container.querySelector('div');

  expect(div).toBeInTheDocument();
});

test('renders ProductPage', () => {
  const { container } = render(
    <Wrapper><ProductPage /></Wrapper>
  );
  const div = container.querySelector('div');
  expect(div).toBeInTheDocument();
});

test('renders ProfilePage', () => {
  const { container } = render(
    <Wrapper><ProfilePage /></Wrapper>
  );
  const div = container.querySelector('div');
  expect(div).toBeInTheDocument();
});

test('renders PaymentPage', () => {
  const { container } = render(
    <Wrapper><PaymentPage /></Wrapper>
  );
  const div = container.querySelector('div');
  expect(div).toBeInTheDocument();
});
