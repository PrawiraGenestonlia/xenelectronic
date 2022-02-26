import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, RootState } from '../hooks/useRedux';
import { apiRequest } from '../redux/users/user.slice';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { login, status } = useAppSelector((state: RootState) => state.user);
  const onLogin = (e: any) => {
    e.preventDefault();
    dispatch(apiRequest({
      key: 'login',
      body: { name: e.target[1].value }
    }));
  };

  useEffect(() => {
    if (login && login.name) {
      localStorage.setItem('xenName', login.name);
      window.location.href = '/';
    }
  }, [login]);

  return (
    <div className="h-screen">
      <div className="min-h-full flex mt-[10%] justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src="/images/xendit.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600" onClick={(e) => navigate('/home')}>
              For this MVP, no password is required.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  pattern="[a-zA-Z0-9]+"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
                <p className='text-xs mt-2 flex justify-end items-end text-gray-500'>Only alphanumeric format</p>
              </div>

            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                {status === 'loading' ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};
