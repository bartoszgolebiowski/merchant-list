import { useField } from "formik";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

interface BasicFormikCheckboxProps extends CheckboxProps {
  name: string;
  label: string;
}

const BasicFormikCheckbox: React.FC<BasicFormikCheckboxProps> = (props) => {
  const { name, label } = props;
  const [field] = useField(name);

  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={label}
    />
  );
};

export default BasicFormikCheckbox;
