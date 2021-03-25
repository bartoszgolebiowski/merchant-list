import { MerchantFormValues } from "types";
import * as Yup from "yup";

export const initialValuesForm = (): MerchantFormValues => ({
  firstname: "",
  lastname: "",
  avatarUrl: "",
  email: "",
  phone: "",
  hasPremium: false,
});

export const initialTouched = () => ({
  firstname: true,
  lastname: true,
  avatarUrl: true,
  email: true,
  phone: true,
});

const PHONE_REGEX_VALIDATOR = /[0-9]{3}-[0-9]{3}-[0-9]{3}/;

export const merchantValidationSchema = () =>
  Yup.object().shape({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    avatarUrl: Yup.string().required("Required"),
    email: Yup.string().required("Required").email("Not valid email"),
    phone: Yup.string()
      .required("Required")
      .matches(PHONE_REGEX_VALIDATOR, "Not valid phone number format"),
  });
