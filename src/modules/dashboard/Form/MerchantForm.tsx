import * as React from "react";
import { Formik } from "formik";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import BasicFormikCheckbox from "common/components/input/BasicFormikCheckbox";
import BasicFormikFileInput from "common/components/input/BasicFormikFileInput";
import BasicFormikInput from "common/components/input/BasicFormikInput";
import BasicFormikErrorMessage from "common/components/input/BasicFormikErrorMessage";

import MerchantFormHeader from "./MerchantFormHeader";
import MerchantFormButtons from "./MerchantFormButtons";
import {
  initialTouched,
  initialValuesForm,
  merchantValidationSchema,
} from "./utils";

import { MerchantFormValues } from "types";

type MerchantFormProps = {
  title?: string;
  initialValues?: MerchantFormValues;
  onClose: () => void;
  onSubmit: (values: MerchantFormValues) => Promise<void>;
};

const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    maxHeight: "80vh",
    padding: "0 0 2rem 0",
    overflowY: "scroll",
    [theme.breakpoints.up("md")]: {
      maxHeight: "85vh",
    },
  },
}));

const CREATE_TITLE = "Create";

const MerchantForm: React.FC<MerchantFormProps> = (props) => {
  const {
    title = CREATE_TITLE,
    initialValues = initialValuesForm(),
    onSubmit,
    onClose,
  } = props;
  const classes = useStyles();

  return (
    <Formik<MerchantFormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={merchantValidationSchema()}
      initialTouched={initialTouched()}
      validateOnMount
      validateOnChange
    >
      <>
        <MerchantFormHeader title={title} onClose={onClose} />
        <Box className={classes.formContainer}>
          <BasicFormikInput name="firstname" label="First Name (*)">
            <BasicFormikErrorMessage name="firstname" />
          </BasicFormikInput>
          <BasicFormikInput name="lastname" label="Last Name (*)">
            <BasicFormikErrorMessage name="lastname" />
          </BasicFormikInput>
          {title === CREATE_TITLE ? (
            <BasicFormikFileInput
              name="avatarUrl"
              label="Avatar (*)"
              inputProps={{
                accept: "image/*",
              }}
            >
              <BasicFormikErrorMessage name="avatarUrl" />
            </BasicFormikFileInput>
          ) : null}
          <BasicFormikInput name="email" label="Email (*)" type="email">
            <BasicFormikErrorMessage name="email" />
          </BasicFormikInput>
          <BasicFormikInput name="phone" label="Phone (*)" type="tel">
            <span id="phone">000-000-000</span>
            <BasicFormikErrorMessage name="phone" />
          </BasicFormikInput>
          <BasicFormikCheckbox name="hasPremium" label="Has premium" />
        </Box>
        <MerchantFormButtons />
      </>
    </Formik>
  );
};

export default MerchantForm;
