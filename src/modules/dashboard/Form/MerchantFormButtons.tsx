import * as React from "react";
import { useFormikContext } from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { MerchantFormValues } from "types";

const MerchantFormButtons: React.FC = () => {
  const {
    isValid,
    isSubmitting,
    submitForm,
    resetForm,
  } = useFormikContext<MerchantFormValues>();

  return (
    <Box position="absolute" left="0" bottom="0" width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        flex="1"
        padding="1rem"
        alignContent="flex-end"
      >
        <Button
          variant="contained"
          color="secondary"
          type="reset"
          onClick={() => resetForm()}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={submitForm}
          disabled={!isValid || isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default MerchantFormButtons;
