import { Label, Input, Group } from "./form-input.styles.js";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <Label shrink={otherProps.value.length} htmlFor={otherProps.name}>
          {label}
        </Label>
      )}
    </Group>
  );
};

export default FormInput;
