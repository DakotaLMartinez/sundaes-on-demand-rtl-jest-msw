import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";

import { rest } from "msw";
import { server } from "../../../mocks/server";

test("order button is disabled if no scoops are selected", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<OrderEntry setOrderPhase={jest.fn()}/>);

  const orderButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(orderButton).toBeEnabled();

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  
  expect(orderButton).toBeDisabled();

  unmount();
});

test("displays error for scoops and toppings", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByText(
      /An unexpected error occured. Please try again later/i
    );
    expect(alerts).toHaveLength(2);
  });
});
