import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useState, useEffect } from "react";

function AvailbleMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHttpError, setHttpError] = useState(); // bởi vì bắt lỗi nên k đươn thuần giá trị chỉ là true/false

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://favorite-product-c1c0f-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          throw new Error("something went wrong");
        }

        const data = await response.json();

        let loadData = [];

        for (const key in data) {
          loadData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadData);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    // k theẻ dùng try catch ở đây do fetchdata là hàm bất động bộ, nó sẽ trả veef một lời hứa, nên việc dùng
    // trả về 1 lỗi sẽ khiến promise bị reject
    // có thể dùng fetch().catch((error) => {.....})
    fetchData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.MealsItem}>loading ....</p>
      </section>
    );
  }

  if (isHttpError) {
    return (
      <section>
        <p className={classes.MealsError}> Error..........</p>
      </section>
    );
  }

  const mealsItem = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price.toFixed(2)}
      />
    );
  });

  return (
    <ul className={classes.meals}>
      <Card>{mealsItem}</Card>
    </ul>
  );
}

export default AvailbleMeals;
