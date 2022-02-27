import NavBar from './navBar';

export default function Layout(props: any) {
  return (
    <div className='flex flex-col'>
      <NavBar />
      {props.children}
    </div>
  );
}
