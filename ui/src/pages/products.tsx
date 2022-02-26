/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, RootState } from '../hooks/useRedux';
import { apiRequest } from '../redux/user/user.slice';
import Layout from '../components/layout';

export const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { login } = useAppSelector((state: RootState) => state.user);

  return (
    <Layout>
      <div className="h-screen m-4">
        Products
      </div>
    </Layout>

  );
};
