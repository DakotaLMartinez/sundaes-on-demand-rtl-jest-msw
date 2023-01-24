import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";
import OrderEntry from "../OrderEntry";

test("displays a red input given an invalid scoop count", async () => {
  const user = userEvent.setup();
  // {
  //   name: "Chocolate",
  //   imagePath: "/images/mint-chip.png",
  // }
  const { unmount } = render(
    <ScoopOption name="Chocolate" imagePath="/images/chocolate.png" />
  );

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "-1");

  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "16");
  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");
  expect(chocolateInput).not.toHaveClass("is-invalid");

  unmount();
});


