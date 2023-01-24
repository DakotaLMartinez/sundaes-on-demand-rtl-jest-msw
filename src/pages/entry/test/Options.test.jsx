import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event"

import Options from "../Options";

test("displays an image for each scoop from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((el) => el.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays an image for each topping from the server", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);
  const altText = toppingImages.map((el) => el.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("doesn't update the scoop subtotal if given an invalid number of scoops", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<Options optionType="scoops" />);

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  const scoopsSubtotal = await screen.findByText("Scoops total: $", {
    exact: false,
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("4.00");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "-1");

  expect(scoopsSubtotal).toHaveTextContent("0.00");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");

  expect(scoopsSubtotal).toHaveTextContent("2.00");

  unmount();
});