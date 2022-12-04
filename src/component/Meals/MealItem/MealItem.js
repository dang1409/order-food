import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm.js";
import { useContext } from "react";
import CartContext from "../../../store/CartContext";

function MealItem(props) {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li>
      <div className={classes.meal}>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{`$${props.price}`}</div>
      </div>
      <MealItemForm onAddtoCart={addToCartHandler}></MealItemForm>
    </li>
  );
}

export default MealItem;
