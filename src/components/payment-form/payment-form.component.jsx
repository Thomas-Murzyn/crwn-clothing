import { PaymentFormContainer, FormContainer } from "./payment-form.styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPES } from "../button/button.component";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cart/cart.action";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else if (paymentResult.paymentIntent.status === "succeeded") {
      alert("Payment succeeded");
      dispatch(clearCart());
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={handlePayment}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPES.inverted}
        >
          Pay now
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
}

export default PaymentForm;
