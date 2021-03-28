import Typography from "@material-ui/core/Typography";
import { ErrorMessage, ErrorMessageProps } from "formik";

interface BasicFormikErrorMessageProps extends ErrorMessageProps {}

const BasicFormikErrorMessage: React.FC<BasicFormikErrorMessageProps> = (
  props
) => {
  return (
    <ErrorMessage {...props}>
      {(error) => (
        <Typography
          paragraph
          color="error"
          role="alert"
          aria-label={props.name}
        >
          {error}
        </Typography>
      )}
    </ErrorMessage>
  );
};

export default BasicFormikErrorMessage;
