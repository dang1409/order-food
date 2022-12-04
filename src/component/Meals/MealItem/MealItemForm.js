import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";
import { useRef, useState } from "react";

function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    
    props.onAddtoCart(enteredAmountNumber)
  };
  const amountInputRef = useRef();

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          min: "1",
          max: "5",
          step: "1",
          type: "number",
          defaultValue: "1",
        }}
      ></Input>
      <button >Add</button>
      {!amountIsValid && <p>Please enter valid amount</p>}
    </form>
  );
}

export default MealItemForm;
