
import Layout from '../components/layout';

export const ProfilePage = () => {
  return (
    <Layout>
      <div className="m-4">
        Hello, {localStorage.getItem('xenName')}
      </div>
    </Layout>

  );
};
