import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";

const Cart = ({ cart, onEmptyCart, onRemoveFromCart, onUpdateCartQty }) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography
      variant="subtitle1"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      gutterBottom
      gutterTop
    >
      You have no items in your shopping cart
      <br />
      <br />
      <Button
        component={Link}
        to="/e-commerce"
        className={classes.button}
        type="button"
        variant="contained"
        color="primary"
      >
        Add items!
      </Button>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>

      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={onEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to="/e-commerce/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return "Loading...";

  return (
    <Container>
      <div className={classes.toolbar} />
      <br />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      <br />
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
