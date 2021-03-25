import * as React from "react";
import { useField } from "formik";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Input, { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import CircularProgress from "@material-ui/core/CircularProgress";

interface BasicFormikInputProps extends OutlinedInputProps {
  name: string;
  label: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 0",
  },
  progress: {
    color: theme.palette.success.dark,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const BasicFormikFileInput: React.FC<BasicFormikInputProps> = (props) => {
  const { name, label, children } = props;
  const c = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [, , helper] = useField(name);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      helper.setValue("SHOULD_BE_URL_FROM_STATIC_HOSTING");
    }, 1000);
  };

  return (
    <label htmlFor={name} className={c.input}>
      {label}
      <Input
        id={name}
        {...props}
        disabled={loading}
        onChange={handleChangeFile}
        type="file"
        endAdornment={
          loading && <CircularProgress size={24} className={c.progress} />
        }
      />

      {children}
    </label>
  );
};

export default BasicFormikFileInput;
