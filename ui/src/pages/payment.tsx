import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, RootState } from '../hooks/useRedux';
import { apiRequest as cartApiRequest } from '../redux/carts/cart.slice';
import Layout from '../components/layout';
import { toast } from 'react-toastify';

export const PaymentPage = () => {
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

  const onPay = () => {
    dispatch(cartApiRequest({
      key: 'checkout',
      path: {
        '{name}': localStorage.getItem('xenName')
      }
    }));
    toast.success('You have successfuly checkout!', {
      position: toast.POSITION.BOTTOM_CENTER
    });
    navigate('/home');
  };

  return (
    <Layout>
      <div className="m-4 flex flex-col items-center">
        <div className='text-center'>
          Thank you for shopping with us. Please make sure all items are correctly added to cart before checking out.
        </div>
        <button
          onClick={() => onPay()}
          className="m-8 group relative sm:w-[32rem] w-[16rem] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Pay $ {subtotalCalculator().toFixed()}
        </button>

      </div>
    </Layout>

  );
};
