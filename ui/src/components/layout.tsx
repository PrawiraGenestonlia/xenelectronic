import NavBar from './navBar';

export default function Layout(props: any) {
  return (
    <div className='h-screen flex flex-col'>
      <NavBar />
      {props.children}
    </div>
  );
}
