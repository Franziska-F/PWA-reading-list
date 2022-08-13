import NavBar from '../components/NavBar';

export default function Layout(props) {
  return (
    <div>
      <NavBar bookList={props.bookList} setBookList = {props.setBookList} />
      {props.children} {/* all the content of the page */}
    </div>
  );
}
