import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles.js";
import Button, { BUTTON_TYPES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";

import {
  signInWithGooglePopup,
  signInWithPasswordAndEmail,
} from "../../utils/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithPasswordAndEmail(email, password);

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("User not found, please create an account");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <SignInContainer>
      <h2>I already have an account ?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          required
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={handleChange}
        />

        <ButtonsContainer>
          <Button type="submit">Sign in</Button>
          <Button
            onClick={logGoogleUser}
            type="button"
            buttonType={BUTTON_TYPES.google}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}

export default SignInForm;
