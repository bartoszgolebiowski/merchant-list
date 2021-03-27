import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MerchantForm from "../MerchantForm";

const fillTextInput = async (label: RegExp, value: string, name: RegExp) => {
  fireEvent.change(screen.getByLabelText(label), {
    target: { value },
  });
  await waitForElementToBeRemoved(() => screen.getByRole("alert", { name }));
};

describe("MerchantForm", () => {
  it("empty form", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();

    render(<MerchantForm onSubmit={onSubmit} onClose={onClose} />);
    const required = await screen.findAllByText(/required/i);

    expect(required.length).toBeGreaterThan(0);
  });

  it("close form", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();

    render(<MerchantForm onSubmit={onSubmit} onClose={onClose} />);
    await screen.findAllByText(/required/i);

    userEvent.click(
      screen.getByRole("button", {
        name: /close\-form/i,
      })
    );
    await waitFor(() => expect(onClose).toBeCalled());
  });

  it("change title and initialValues", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    const initialValues = {
      firstname: "Adam321",
      lastname: "Kowalski321",
      avatarUrl: "",
      email: "adam.kowalski@gmail.com",
      phone: "",
      hasPremium: true,
    };

    render(
      <MerchantForm
        onSubmit={onSubmit}
        onClose={onClose}
        title="Edit"
        initialValues={initialValues}
      />
    );
    await screen.findAllByText(/required/i);
    expect(screen.getByText(/edit/i)).toBeDefined();
    expect(screen.getByDisplayValue(/Adam321/i)).toBeDefined();
    expect(screen.getByDisplayValue(/Kowalski321/i)).toBeDefined();
    expect(screen.getByDisplayValue(/adam.kowalski@gmail.com/i)).toBeDefined();
  });

  it("reset button", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    render(<MerchantForm onSubmit={onSubmit} onClose={onClose} />);
    await screen.findAllByText(/required/i);

    await fillTextInput(/first name/i, "John", /firstname/i);
    await fillTextInput(/last name/i, "Snow", /lastname/i);
    await fillTextInput(/Email/, "test.test@gmail.com", /email/i);

    expect(screen.getByDisplayValue(/John/i)).toBeDefined();
    expect(screen.getByDisplayValue(/Snow/i)).toBeDefined();
    expect(screen.getByDisplayValue(/test.test@gmail.com/i)).toBeDefined();

    userEvent.click(
      screen.getByRole("button", {
        name: /reset/i,
      })
    );

    expect(screen.queryAllByDisplayValue(/John/i).length).toBe(0);
    expect(screen.queryAllByDisplayValue(/Snow/i).length).toBe(0);
    expect(screen.queryAllByDisplayValue(/test.test@gmail.com/i).length).toBe(
      0
    );
  });

  it("form fill fields and submit", async () => {
    const file = new File(
      ["austriacki_akwarelista"],
      "austriacki_akwarelista.png",
      { type: "image/png" }
    );
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    render(<MerchantForm onSubmit={onSubmit} onClose={onClose} />);
    await screen.findAllByText(/required/i);

    await screen.findByRole("heading", {
      name: /create/i,
    });

    await fillTextInput(/first name/i, "John", /firstname/i);
    await fillTextInput(/last name/i, "Snow", /lastname/i);
    await fillTextInput(/Email/, "John.snow@gmail.com", /email/i);
    await fillTextInput(/Phone/, "420-213-742", /phone/i);

    userEvent.upload(screen.getByLabelText(/Avatar/), file);
    await waitForElementToBeRemoved(() =>
      screen.getByRole("alert", { name: /avatarurl/i })
    );

    userEvent.click(
      screen.getByRole("checkbox", {
        name: /has premium/i,
      })
    );

    await waitFor(() =>
      expect(
        screen.getByRole("button", {
          name: /submit/i,
        })
      ).not.toBeDisabled()
    );

    userEvent.click(
      screen.getByRole("button", {
        name: /submit/i,
      })
    );

    await waitFor(() => expect(onSubmit).toBeCalled());
  });
});
