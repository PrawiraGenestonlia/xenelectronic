import NavBar from './navBar';
import { ToastContainer } from 'react-toastify';

export default function Layout(props: any) {
  return (
    <div className='flex flex-col w-screen'>
      <NavBar />
      {props.children}
      <ToastContainer />
    </div>
  );
}
