import Header from "./component/Layout/Header/Header";
import "./App.css";
import Meals from "./component/Meals/Meals";
import Cart from "./component/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CardProvider";

function App() {
  const [cartIsShow, setCartIsShow] = useState(false);

  const hideCartHandler = () => {
    setCartIsShow(false);
  };
  const showCartHandler = () => {
    setCartIsShow(true);
  };

  return (
    <div className="App">
      <CartProvider>
        {cartIsShow ? <Cart onHideCart={hideCartHandler}></Cart> : undefined}
        <Header onShowCart={showCartHandler}></Header>
        <main>
          <Meals></Meals>
        </main>
      </CartProvider>
    </div>
  );
}

export default App;
