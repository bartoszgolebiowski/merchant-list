import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Input from "@material-ui/core/OutlinedInput";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

import { MerchantFormValues } from "types";

type MerchantFormProps = {
  title?: string;
  defaultValues?: MerchantFormValues;
  onClose: () => void;
  onSubmit: (values: MerchantFormValues) => Promise<void>;
};

const useStyles = makeStyles((theme: Theme) => ({
  closeIcon: { cursor: "pointer" },
  formContainer: {
    "& > div": {
      padding: "1rem 0",
    },
  },
}));

const defaultValuesFun = (): MerchantFormValues => ({
  firstname: "",
  lastname: "",
  avatarUrl: "",
  email: "",
  phone: "",
  hasPremium: false,
});

const MerchantForm: React.FC<MerchantFormProps> = (props) => {
  const {
    title = "Create",
    defaultValues = defaultValuesFun(),
    onSubmit,
    onClose,
  } = props;
  const c = useStyles();
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [values, setValues] = React.useState<MerchantFormValues>(defaultValues);

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSubmitting(true);
    onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  };

  const handleChange = (name: keyof MerchantFormValues) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues((values) => ({ ...values, [name]: e.target.value }));
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((values) => ({ ...values, hasPremium: e.target.checked }));
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files !== null) {
      setValues((values) => ({
        ...values,
        avatarUrl: files[0]?.name || "error",
      }));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      flex="1"
      className={c.formContainer}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">{title}</Typography>
        <CloseIcon onClick={onClose} className={c.closeIcon} />
      </Box>
      <FormControl>
        <label htmlFor="firstname">First Name</label>
        <Input
          id="firstname"
          name="firstname"
          value={values.firstname}
          disabled={isSubmitting}
          inputProps={{
            required: true,
          }}
          onChange={handleChange("firstname")}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="lastname">Last Name</label>
        <Input
          id="lastname"
          name="lastname"
          value={values.lastname}
          disabled={isSubmitting}
          inputProps={{
            required: true,
          }}
          onChange={handleChange("lastname")}
        />
      </FormControl>
      {title === "Create" ? (
        <FormControl>
          <label htmlFor="avatarUrl">Avatar</label>
          <Input
            id="avatarUrl"
            name="avatarUrl"
            disabled={isSubmitting}
            type="file"
            onChange={handleChangeFile}
            inputProps={{
              required: true,
              accept: "image/*",
            }}
          />
        </FormControl>
      ) : null}
      <FormControl>
        <label htmlFor="avatarUrl">Email</label>
        <Input
          id="email"
          name="email"
          disabled={isSubmitting}
          type="email"
          value={values.email}
          inputProps={{
            required: true,
          }}
          onChange={handleChange("email")}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="avatarUrl">Phone</label>
        <Input
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange("phone")}
          disabled={isSubmitting}
          inputProps={{
            required: true,
            pattern: "[0-9]{3}-[0-9]{3}-[0-9]{3}",
          }}
          type="tel"
        />
        <span id="my-helper-text">000-000-000</span>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            disabled={isSubmitting}
            onChange={handleChangeCheckbox}
            checked={values.hasPremium}
          />
        }
        label="Has premium"
      />
      <Box
        display="flex"
        justifyContent="space-between"
        flex="1"
        alignContent="flex-end"
      >
        <Button variant="contained" color="secondary" type="reset">
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default MerchantForm;
