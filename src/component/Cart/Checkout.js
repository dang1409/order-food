import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

function Checkout(props) {
  const [inputState, setInputState] = useState({
    name: true,
    street: true,
    code: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const codeInputRef = useRef();
  const cityInputRef = useRef();

  const isEmpty = (value) => {
    return value.trim() === "";
  };
  const isFiveNumber = (value) => {
    return value.length === 5;
  };

  const confirmHandler = (event) => {
    event.preventDefault();
    if (props.items.length === 0) {
      return;
    }

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCode = codeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const codeIsValid = isFiveNumber(enteredCode);
    const cityIsValid = !isEmpty(enteredCity);

    setInputState({
      name: nameIsValid,
      street: streetIsValid,
      code: codeIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && codeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      code: enteredCode,
      city: enteredCity,
    });
  };

  return (
    <form onSubmit={confirmHandler} className={classes.formRoot}>
      <div className={classes.form}>
        <div
          className={`${classes.control} ${
            inputState.name ? "" : classes.invalid
          }`}
        >
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!inputState.name && <p>Please type your name </p>}
        </div>
        <div
          className={`${classes.control} ${
            inputState.street ? "" : classes.invalid
          }`}
        >
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!inputState.street && <p>Please type your Street </p>}
        </div>
        <div
          className={`${classes.control} ${
            inputState.code ? "" : classes.invalid
          }`}
        >
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={codeInputRef} />
          {!inputState.code && <p>Please type your Code </p>}
        </div>
        <div
          className={`${classes.control} ${
            inputState.city ? "" : classes.invalid
          }`}
        >
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!inputState.city && <p>Please type your City </p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
