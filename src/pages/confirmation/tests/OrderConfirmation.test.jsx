import { screen, render } from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderConfirmation from "../OrderConfirmation";

test("Server Error is displayed on Order Confirmation Page", async () => {
  server.resetHandlers([
    rest.post("http://localhost:3030/order", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  ]);

  const { unmount } = render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  
  const alert = await screen.findByRole("alert")
  expect(alert).toHaveTextContent("An unexpected error occurred. Please try again later.")

  unmount();
});