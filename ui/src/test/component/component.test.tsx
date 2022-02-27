
/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import CategoryCard from '../../components/categoryCard';
import Layout from '../../components/layout';
import NavBar from '../../components/navBar';
import ProductCard from '../../components/productCard';
import { BrowserRouter } from 'react-router-dom';

test('renders CategoryCard', () => {
  const CATEGORIES_MOCK_DATA = [
    {
      categoryDescription: 'Find your daily electronics here.',
      categoryImageUrl: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1915&q=80',
      categoryName: 'Home Appliances',
      id: 1
    },
    {
      categoryDescription: 'Explore our exclusive TV and Entertainment products.',
      categoryImageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      categoryName: 'TV & Entertainment',
      id: 2
    }
  ];
  const { container } = render(
    <CategoryCard category={CATEGORIES_MOCK_DATA[0]} />
  );
  const div = container.querySelector('div');
  expect(div).toBeInTheDocument();
});

test('renders Layout', () => {
  const { container } = render(
    <BrowserRouter><Layout><div>Children</div></Layout></BrowserRouter>
  );
  const div = container.querySelector('div');
  expect(div).toBeInTheDocument();
});

test('renders NavBar', () => {
  const { container } = render(
    <BrowserRouter><NavBar /></BrowserRouter>
  );
  const div = container.querySelector('div');
  expect(div).toBeInTheDocument();
});

test('renders ProductCard', () => {
  const PRODUCTS_MOCK_DATA = [
    {
      description: 'description',
      discountEndDate: null,
      discountPercentage: 10,
      id: 1,
      isAvailable: true,
      postedDate: '2022-02-27T07:06:40.068Z',
      previewImageUrl: 'https://sc04.alicdn.com/kf/H1e93158c9f14494fa323ed782638956cx.jpg',
      price: 49.9,
      productName: 'Super XenFan 3',
      categoryName: {
        categoryDescription: 'Find your daily electronics here.',
        categoryImageUrl: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1915&q=80',
        categoryName: 'Home Appliances',
        id: 1
      }
    },
    {
      description: 'description',
      discountEndDate: null,
      discountPercentage: 0,
      id: 2,
      isAvailable: true,
      postedDate: '2022-02-27T07:06:40.068Z',
      previewImageUrl: '',
      price: 69.9,
      productName: 'Super XenFan 3X',
      categoryName: {
        categoryDescription: 'Find your daily electronics here.',
        categoryImageUrl: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1915&q=80',
        categoryName: 'Home Appliances',
        id: 1
      }
    }
  ];
  render(
    <ProductCard product={PRODUCTS_MOCK_DATA[0]} addProduct={() => { console.log(''); }} />
  );
  const { container } = render(
    <ProductCard product={PRODUCTS_MOCK_DATA[1]} addProduct={() => { console.log(''); }} />
  );
  const div = container.querySelector('div');
  const button = container.querySelector('button');
  button?.click();
  expect(div).toBeInTheDocument();
});
