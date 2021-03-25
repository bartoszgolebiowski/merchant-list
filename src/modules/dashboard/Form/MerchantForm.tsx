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
    "& > div": {
      padding: "1rem 0",
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
  const c = useStyles();

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
        <Box
          display="flex"
          flexDirection="column"
          flex="1"
          className={c.formContainer}
        >
          <BasicFormikInput name="firstname" label="FirstName (*)">
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
