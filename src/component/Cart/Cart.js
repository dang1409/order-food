import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSumited, setIsSubmited] = useState(false);

  const CartCtx = useContext(CartContext);

  const removeItemHandler = (id) => {
    CartCtx.removeItem(id);
  };
  const addItemHandler = (item) => {
    CartCtx.addItem({ ...item, amount: 1 });
  };
  const openInformation = () => {
    setIsCheckoutOpen(true);
  };

  const postDataHandler = (user) => {
    setIsLoading(true);
    fetch(
      "https://favorite-product-c1c0f-default-rtdb.firebaseio.com/ordered.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: user,
          ordered: CartCtx.items,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setIsLoading(false);
    setIsSubmited(true);
    CartCtx.resetItem();
  };

  const buttonCart = (
    <Fragment>
      <button className={classes["button-alt"]} onClick={props.onHideCart}>
        Close
      </button>
      <button className={classes.button} onClick={openInformation}>
        Add
      </button>
    </Fragment>
  );

  const modelCart = (
    <Fragment>
      <ul className={classes["cart-items"]}>
        {CartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={removeItemHandler.bind(null, item.id)}
            onAdd={addItemHandler.bind(null, item)}
          ></CartItem>
        ))}
      </ul>

      <div className={classes.total}>
        <span>Total Price</span>
        <span>${CartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        {/* //tại sao ở đây k dùng thẻ button chung */}
        {!isCheckoutOpen && buttonCart}
      </div>
      {isCheckoutOpen && (
        <Checkout
          items={CartCtx.items}
          onCancel={props.onHideCart}
          onConfirm={postDataHandler}
        ></Checkout>
      )}
    </Fragment>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {isLoading && <p>Is Loading.......</p>}
      {!isLoading && !isSumited && modelCart}
      {isSumited && !isLoading && <p>Submited Complete</p>}
    </Modal>
  );
}

export default Cart;
