import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, RootState } from '../hooks/useRedux';
import { apiRequest } from '../redux/products/products.slice';
import { apiRequest as cartApiRequest } from '../redux/carts/cart.slice';
import Layout from '../components/layout';
import ProductCard from '../components/productCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getAllProducts, getProductByCategory } = useAppSelector((state: RootState) => state.products);
  const productList = categoryName ? getProductByCategory : getAllProducts;

  useEffect(() => {
    if (categoryName) {
      dispatch(apiRequest({
        key: 'getProductByCategory',
        path: { '{categoryName}': categoryName }
      }));
    } else {
      dispatch(apiRequest({
        key: 'getAllProducts'
      }));
    }
  }, [dispatch, categoryName]);

  const addProduct = (productName: string) => {
    dispatch(cartApiRequest({
      key: 'addToCart',
      body: {
        name: localStorage.getItem('xenName'),
        productName: productName
      }
    }));
    toast.success(`Added ${productName} to cart!`, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  return (
    <Layout>
      <div className="m-4">
        <div className='w-full flex flex-grow flex-row items-center'>
          {categoryName && <div className='flex flex-row items-center w-full'>
            <span>Currently, viewing </span>
            <span className='font-bold text-xl ml-2'>{categoryName}</span>
            <span>.</span>
          </div>}

          <div className='flex flex-row items-center justify-end w-full'>
            {categoryName && <button className='mr-5 p-2 bg-indigo-200 rounded-xl items-end shadow-md hover:bg-indigo-400' onClick={() => navigate('/products')}>View All Products</button>}
            <button className='p-2 bg-indigo-200 rounded-xl items-end shadow-md hover:bg-indigo-400' onClick={() => navigate('/home')}>View Other Categories</button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {
            Array.isArray(productList) && productList.map((item) =>
              <div key={item.productName}><ProductCard product={item} addProduct={addProduct} /></div>
            )
          }
        </div>
      </div>

    </Layout>

  );
};
