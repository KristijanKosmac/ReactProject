import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import { withRouter } from "react-router-dom";

import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";

// Moze i da se destruktira i namesto mapDispatchToProps da se pisuva moze samo kako argument da se dade namesto toggleCartHidden,
//dispatch i posle vo onClick namesto toggleCartHidden kje bide dispatch(toggleCartHidden());
const CartDropdown = ({ cartItems, history, toggleCartHidden }) => (
  <div className="cart-dropdown ">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem}></CartItem>
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        {
          toggleCartHidden();
        }
      }}
    >
      CHECKOUT
    </CustomButton>
  </div>
);

// Bez selector//
// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   cartItems,
// });

// So selector bez StructedSelector
// const mapStateToProps = (state) => ({
//   cartItems: selectCartItems(state),
// });

// So selector i so StructedSelector
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);
