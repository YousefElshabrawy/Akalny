import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import api from "../../api/api";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [orderIsClicked, setOrderIsClicked] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderClickHandler = () => {
    setOrderIsClicked(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const submitFormHandler = async (userData) => {
    try {
      await api.post("/orders.json", {
        user: userData,
        order: cartCtx.items,
        total: cartCtx.totalAmount,
      });
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (err) {
      if (err.response) {
        //Not in the 200 range
      } else {
        console.log(err.message);
      }
    }
  };
  let modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderIsClicked && (
        <Checkout onCancel={props.onClose} submitForm={submitFormHandler} />
      )}
      {!orderIsClicked && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderClickHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );
  if (didSubmit) {
    modalContent = (
      <>
        <p>Order submitted successfully.</p>
        <div className={classes.actions}>
          <button onClick={props.onClose}>Close</button>
        </div>
      </>
    );
  }
  return <Modal onClose={props.onClose}>{modalContent}</Modal>;
};

export default Cart;
