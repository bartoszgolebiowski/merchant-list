import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Input, { OutlinedInputProps } from "@material-ui/core/OutlinedInput";

interface BasicFormikInputProps extends OutlinedInputProps {
  name: string;
  label: string;
}

const useStyles = makeStyles(() => ({
  input: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 0 0 0",
  },
}));

const BasicFormikInput: React.FC<BasicFormikInputProps> = (props) => {
  const { name, label, children } = props;
  const c = useStyles();
  const [field] = useField(name);

  return (
    <label htmlFor={name} className={c.input}>
      {label}
      <Input id={name} {...props} {...field} />
      {children}
    </label>
  );
};

export default BasicFormikInput;
