import { screen, render, logRoles } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("the button should be disabled initially", () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });
  const submitButton = screen.getByRole("button", { name: /Confirm order/i });
  expect(checkbox).not.toBeChecked();
  expect(submitButton).toBeDisabled();
});

test("the checkbox should enable the button", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });
  const submitButton = screen.getByRole("button", { name: /Confirm order/i });
  await user.click(checkbox);
  expect(submitButton).toBeEnabled();
  await user.click(checkbox);
  expect(submitButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  const { container } = render(<SummaryForm />);

  // popover starts as hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // logRoles(container);
  // is visible when user hovers over checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
