import { Typography } from "@material-ui/core";
import { ErrorMessage, ErrorMessageProps } from "formik";

interface BasicFormikErrorMessageProps extends ErrorMessageProps {}

const BasicFormikErrorMessage: React.FC<BasicFormikErrorMessageProps> = (
  props
) => {
  return (
    <ErrorMessage {...props}>
      {(error) => (
        <Typography paragraph color="error">
          {error}
        </Typography>
      )}
    </ErrorMessage>
  );
};

export default BasicFormikErrorMessage;
