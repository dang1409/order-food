import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { useContext } from "react";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";

function Cart(props) {
  const CartCtx = useContext(CartContext);

  const removeItemHandler = (id) => {
    CartCtx.removeItem(id);
  }
  const addItemHandler = item => {
    CartCtx.addItem({...item, amount: 1});
  }

  console.log(CartCtx.totalAmount )

  return (
    <Modal onClick={props.onHideCart}>
      <ul className={classes["cart-items"]}>
        {CartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove = {removeItemHandler.bind(null, item.id)}
            onAdd = {addItemHandler.bind(null,item)}
          ></CartItem>
        ))}
      </ul>

      <div className={classes.total}>
        <span>Total Price</span>
        <span>${CartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions  }>
        {/* //tại sao ở đây k dùng thẻ button chung */}
        <button className={classes["button-alt"]} onClick={props.onHideCart}>
          Close
        </button>
        <button className={classes.button}>Add</button>
      </div>
    </Modal>
  );
}

export default Cart;
