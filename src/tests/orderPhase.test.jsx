import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  // render app
  const { unmount } = render(<App />);
  // add ice cream scoops and toppings

  const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
  expect(orderButton).toBeDisabled();
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  expect(orderButton).toBeEnabled();

  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesInput);

  // find and click order button
  await user.click(orderButton);

  // check summary information based on order
  const scoopsSummary = await screen.findByRole("heading", {
    name: "Scoops: $4.00",
  });
  expect(scoopsSummary).toBeInTheDocument();
  const toppingsSummary = await screen.findByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsSummary).toBeInTheDocument();

  expect(screen.getByText("2 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const agreeToTermsBox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  await user.click(agreeToTermsBox);
  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });
  await user.click(confirmOrderButton);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const thankYou = await screen.findByRole("heading", {
    name: /thank you/i
  })
  expect(thankYou).toBeInTheDocument();
  // expect loading not to appear in the document after the thank you has appeared
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/Your order number is/);
  expect(orderNumber).toBeInTheDocument();

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: "Create new order",
  });
  await user.click(newOrderButton);
  // check that scoops and toppings subtotals have been reset
  const toppingsNode = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsNode).toHaveTextContent("0.00");

  const scoopsNode = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsNode).toHaveTextContent("0.00");

  unmount();
});

test("toppings don't appear on order summary if none are ordered", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);

  const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
  expect(orderButton).toBeDisabled();
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  expect(orderButton).toBeEnabled();

  await user.click(orderButton);

  const toppingsHeader = screen.queryByRole("heading", {
    name: /Toppings:/i
  })
  expect(toppingsHeader).not.toBeInTheDocument();

  unmount();
})

test("toppins don't appear if toppings are added and then removed", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);

  const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries"
  })
  // add a topping
  await user.click(cherriesToppingCheckbox);
  // remove the topping
  await user.click(cherriesToppingCheckbox);

  // submit order
  await user.click(orderButton);

  const scoopsHeader = await screen.findByRole("heading", {
    name: /scoops:/i,
  });
  expect(scoopsHeader).toBeInTheDocument();

  // ensure that toppings header doesn't appear when order doesn't include toppings
  const toppingsHeader = screen.queryByRole("heading", {
    name: /Toppings:/i,
  });
  expect(toppingsHeader).not.toBeInTheDocument();

  unmount();
})