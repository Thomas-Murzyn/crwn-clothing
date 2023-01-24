import {
  BaseButton,
  GoogleButton,
  InvertedButton,
  LoadingButton,
} from "./button.styles.js";

export const BUTTON_TYPES = {
  base: "base",
  google: "google",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPES.base) => {
  return {
    [BUTTON_TYPES.base]: BaseButton,
    [BUTTON_TYPES.google]: GoogleButton,
    [BUTTON_TYPES.inverted]: InvertedButton,
  }[buttonType];
};

function Button({ children, buttonType, isLoading, ...otherProps }) {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <LoadingButton /> : children}
    </CustomButton>
  );
}

export default Button;
