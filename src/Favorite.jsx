import { useSelector } from "react-redux";

const FavoritePage = () => {
  const favorites = useSelector((state) => state.favorite.favorites); // Get favorite meals from Redux store

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Favorite Recipe</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((meal) => {
            const ingredients = [];
            for (let i = 1; i <= 15; i++) {
              const ingredient = meal[`strIngredient${i}`];
              if (ingredient) ingredients.push(ingredient);
            }

            return (
              <div key={meal.idMeal} className="text-green-800 bg-amber-200 p-5 rounded-md">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-60 object-cover rounded-md"
                />
                <h1 className="text-xl font-bold">{meal.strMeal}</h1>
                <h4>Category: {meal.strCategory}</h4>
                <p className="text-sm">
                  <span className="font-semibold text-green-800">Ingredients:</span> {ingredients.join(", ")}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-green-800">Instructions:</span> {meal.strInstructions}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
