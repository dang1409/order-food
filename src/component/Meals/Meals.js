import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AavailableMeals from "./AvailableMeals";

function Meals() {
  return (
    <Fragment>
      <MealsSummary></MealsSummary>
      <AavailableMeals></AavailableMeals>
    </Fragment>
  );
}

export default Meals;
