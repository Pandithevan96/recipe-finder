import { Favorite, FavoriteBorderOutlined, FilterList } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavorite, removeFavorite } from "./redux/favoriteSlice";

function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [favoritesState, setFavoritesState] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.meals);
        setFilteredMeals(result.meals);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(result.meals.map((meal) => meal.strCategory)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = data.filter((meal) =>
      meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeals(filtered);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category) {
      const filtered = data.filter((meal) => meal.strCategory === category);
      setFilteredMeals(filtered);
    } else {
      setFilteredMeals(data);
    }
  };

  const toggleFavorite = (meal) => {
    const isFavorited = favoritesState[meal.idMeal];
    if (isFavorited) {
      dispatch(removeFavorite(meal.idMeal));
    } else {
      dispatch(addFavorite(meal));
    }
    setFavoritesState({
      ...favoritesState,
      [meal.idMeal]: !isFavorited,
    });
  };

  const navigateToFavorites = () => {
    navigate("/favorite");
  };

  return (
    <div className="p-5 flex flex-col gap-2 ite">
      <div className="flex mb-3 items-center">
        <input
          type="text"
          className="px-3 py-2 border border-black rounded-l-md rounded-r-none w-1/2"
          placeholder="Search for meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-3 py-2 bg-black text-slate-100 rounded-r-md h-[42px]"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>

      {/* Filter by Category */}
      <div className="my-3 flex items-center gap-2">
        <FilterList />
        <FormControl className="w-1/3" variant="outlined">
          <InputLabel id="category-label">Filter by Category</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Filter by Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Display filtered meals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {filteredMeals.map((meal) => {
          const ingredients = [];
          for (let i = 1; i <= 15; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient) ingredients.push(ingredient);
          }

          return (
            <div
              key={meal.idMeal}
              className="text-green-800 bg-amber-200 p-5 rounded-md text-start space-y-2"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-60 object-cover rounded-md"
              />
              <div className="flex justify-between px-4">
                <h1 className="text-xl text-center font-bold">{meal.strMeal}</h1>
                <div
                  onClick={() => toggleFavorite(meal)}
                  className="cursor-pointer"
                >
                  {favoritesState[meal.idMeal] ? (
                    <Favorite style={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </div>
              </div>
              <h4>
                Category: <span className="text-slate-800">{meal.strCategory}</span>
              </h4>
              <p className="text-sm text-slate-800">
                <span className="font-semibold text-green-800">Ingredients:</span>{" "}
                {ingredients.join(", ")}
              </p>
              <p>
                Instruction:{" "}
                <span className=" text-xs text-slate-800">{meal.strInstructions}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
