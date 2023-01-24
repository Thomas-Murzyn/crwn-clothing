import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer } from "./sign-up.styles.js";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/user/user.action";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Confirm password and password must be the same.");
      return;
    }
    dispatch(signUp(email, password, name));
    resetFormFields();
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account ?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          name="name"
          label="Name"
          type="text"
          value={name}
          onChange={handleChange}
        />
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
        <FormInput
          required
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </SignUpContainer>
  );
}

export default SignUpForm;
