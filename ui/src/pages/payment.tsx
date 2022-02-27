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
      position: toast.POSITION.BOTTOM_CENTER,
      theme: 'colored'
    });
    navigate('/home');
  };

  return (
    <Layout>
      <div className="m-4 flex flex-col items-center">
        <div className='text-center m-4'>
          Thank you for shopping with us. Please make sure all items are correctly added to cart before checking out.
        </div>
        <table className="table-auto table text-left">
          <thead>
            <tr>
              <th><div>No</div></th>
              <th><div className='ml-4'>Product</div></th>
              <th><div className='ml-4'>Original Price</div></th>
              <th><div className='ml-4'>Discounted Price</div></th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(getMyCart) && getMyCart.map((item, i) => {
                return (
                  <tr key={item.product.productName}>
                    <td>{i + 1}</td>
                    <td><div className='ml-4'>{item.product.productName}</div></td>
                    <td><div className='ml-4'>$ {item.product.price}</div></td>
                    <td><div className='ml-4'>$ {(item.product.price * (1 - item.product.discountPercentage / 100)).toFixed(2)}</div></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <button
          onClick={() => onPay()}
          className="animate-bounce mt-12 m-8 group relative sm:w-[32rem] w-[16rem] h-12 flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <div className=''>Pay $ {subtotalCalculator().toFixed()} with <span className='font-bold'>Xendit</span></div>
        </button>
      </div>
    </Layout>
  );
};
