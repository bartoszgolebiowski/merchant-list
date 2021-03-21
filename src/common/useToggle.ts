import * as React from "react";

const useToggle = (initialState = false) => {
  const [open, setOpen] = React.useState(initialState);

  const onToggle = () => setOpen((open) => !open);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return {
    open,
    onToggle,
    onClose,
    onOpen,
  };
};

export default useToggle;
