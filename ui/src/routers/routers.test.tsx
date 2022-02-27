
/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import RouterApp from '.';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ToastContainer } from 'react-toastify';

test('renders router app', () => {
  const { container } = render(
    <Provider store={store.store}>
      <RouterApp />
      <ToastContainer />
    </Provider>
  );
  const div = container.querySelector('div');
  expect(div).toBeInTheDocument();
});
