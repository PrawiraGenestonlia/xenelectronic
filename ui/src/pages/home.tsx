import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, RootState } from '../hooks/useRedux';
import { apiRequest } from '../redux/categories/categories.slice';
import Layout from '../components/layout';
import CategoryCard from '../components/categoryCard';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { getAllCategories } = useAppSelector((state: RootState) => state.categories);

  useEffect(() => {
    !getAllCategories && dispatch(apiRequest({
      key: 'getAllCategories'
    }));
  }, [dispatch]);

  return (
    <Layout>
      <div className="m-4">
        <div className='flex flex-wrap items-center justify-center'>
          {
            Array.isArray(getAllCategories) && getAllCategories.map((item) =>
              <Link to={`/products/${item.categoryName}`} key={item.categoryName}><CategoryCard category={item} /></Link>
            )
          }
        </div>
      </div>
    </Layout>

  );
};
