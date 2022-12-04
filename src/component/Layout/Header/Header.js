import { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";

import classes from './Header.module.css'   

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
      </header>
      <div className={classes["main-image"]}>
        <img
          src="https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg"
          alt=""
        />
      </div>
    </Fragment>
  );
};

export default Header;
