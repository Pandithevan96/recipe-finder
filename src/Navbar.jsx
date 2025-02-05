import { Link } from "react-router-dom";
import { Favorite } from "@mui/icons-material";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gradient-to-r from-amber-800 to-emerald-950 shadow-md flex justify-between items-center text-white">
       <Link to="/" className="mr-4"> <h1 className="text-xl font-bold">Recipe Finder</h1></Link>
      <div className="flex gap-4">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/favorite" className="flex gap-2 items-center">
          <Favorite className="text-red-500" />
          <h6>My Favorite</h6>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
