import NavBar from '../components/NavBar';

export default function Layout(props) {
  return (
    <div>
     
      {props.children} {/* all the content of the page */}
    </div>
  );
}
