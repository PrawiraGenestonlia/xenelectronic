/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, RootState } from '../hooks/useRedux';
import { apiRequest as cartApiRequest } from '../redux/carts/cart.slice';
import Layout from '../components/layout';
import { toast } from 'react-toastify';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getMyCart, removeFromCart } = useAppSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(cartApiRequest({
      key: 'getMyCart',
      path: { '{name}': localStorage.getItem('xenName') }
    }));
  }, [dispatch, removeFromCart]);

  const subtotalCalculator = (): number => {
    if (Array.isArray(getMyCart)) {
      return getMyCart.reduce((prev: number, curr) => {
        return prev + (curr.product.price * (1 - curr.product.discountPercentage / 100));
      }, 0);
    } else {
      return 0;
    }
  };

  const removeProduct = (productName: string) => {
    dispatch(cartApiRequest({
      key: 'removeFromCart',
      body: {
        name: localStorage.getItem('xenName'),
        productName: productName
      }
    }));
    toast.info(`Remove ${productName} from cart!`, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  return (
    <Layout>
      <div className="m-4 flex flex-col items-center">
        {Array.isArray(getMyCart) && getMyCart.length
          ? <>
            <div className='font-bold text-4xl'>
              Shopping Cart
            </div>
            <div className='mt-12 mb-8 h-[1px] sm:w-[32rem] w-[16rem] bg-slate-400'></div>
            {
              getMyCart.map((item: any, index: number) => {
                return <div key={index} className="sm:w-[32rem] w-[16rem]">
                  <div className="flex flex-row">
                    <div className='w-48 h-36 p-2 bg-slate-100 sm:block hidden'>
                      <img src={item.product.previewImageUrl} />
                    </div>
                    <div className='w-full flex-grow ml-4'>
                      <div>{item.product.productName}</div>
                    </div>
                    <div className='flex flex-col flex-grow'>
                      <div className='h-full w-16'>$ {(item.product.price * (1 - item.product.discountPercentage / 100)).toFixed(2)}</div>
                      <div className='text-indigo-700 cursor-pointer' onClick={() => removeProduct(item.product.productName)}>Remove</div>
                    </div>
                  </div>
                  <div className='mt-12 mb-8 h-[1px]  sm:w-[32rem] w-[16rem] bg-slate-400'></div>
                </div>;
              })
            }
            <div className='flex flex-row sm:w-[32rem] w-[16rem]'>
              <div className='flex-grow w-full'>Subtotal</div>
              <div className='flex flex-row w-24'>$ {subtotalCalculator().toFixed(2)}</div>
            </div>
            <button
              onClick={() => navigate('/payment')}
              className="m-8 group relative sm:w-[32rem] w-[16rem] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Checkout
            </button>
            <Link to="/home" className='text-indigo-500'>or Continue Shopping →</Link>
          </>
          : <div>No item in the cart! Please shop more :D</div>}
      </div>
    </Layout>

  );
};
