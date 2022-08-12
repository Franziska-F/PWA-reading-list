import NavBar from '../components/NavBar';

export default function Layout(props) {
  return (
    <div>
      <NavBar books={props.books} displayBookCount={props.displayBookCount} />
      {props.children} {/* all the content of the page */}
    </div>
  );
}
