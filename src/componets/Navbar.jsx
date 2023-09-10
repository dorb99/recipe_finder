import { Link } from "react-router-dom";
import "./css files/navbar.css"

function Navbar() {
  return (
    <div id="navbar">
    <Link to="/">Home</Link>
    <Link to="/Ingredients">Ingredients</Link>
    <Link to="/Favorite">Favorite</Link>
    <Link to="/Recipemaker">Searched recipes</Link>
</div>
  );
}
export default Navbar;