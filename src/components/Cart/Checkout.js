import { useState, useRef } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isPostal = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const city = cityRef.current.value;

    setFormValidity({
      name: !isEmpty(name),
      street: !isEmpty(street),
      postalCode: isPostal(postalCode),
      city: !isEmpty(city),
    });

    const formIsValid =
      !isEmpty(name) &&
      !isEmpty(street) &&
      !isEmpty(city) &&
      isPostal(postalCode);

    if (!formIsValid) return;

    //Submit the form
    props.submitForm({ name, street, city, postalCode });
    nameRef.current.value = "";
    streetRef.current.value = "";
    postalCodeRef.current.value = "";
    cityRef.current.value = "";
  };
  const nameClasses = formValidity.name
    ? classes.control
    : `${classes.control} ${classes.invalid}`;
  const streetClasses = formValidity.street
    ? classes.control
    : `${classes.control} ${classes.invalid}`;
  const postalCodeClasses = formValidity.postalCode
    ? classes.control
    : `${classes.control} ${classes.invalid}`;
  const cityClasses = formValidity.city
    ? classes.control
    : `${classes.control} ${classes.invalid}`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValidity.name && (
          <p className={classes["error-message"]}>Please enter valid name</p>
        )}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.street && (
          <p className={classes["error-message"]}>Please enter valid street</p>
        )}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeRef} />
        {!formValidity.postalCode && (
          <p className={classes["error-message"]}>
            Please enter valid postal code
          </p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.city && (
          <p className={classes["error-message"]}>Please enter valid city</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>

      <div></div>
    </form>
  );
};
export default Checkout;
