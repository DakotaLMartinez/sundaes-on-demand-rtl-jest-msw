import {
  render,
  screen,
  logRoles,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scroops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  const scoopsNode = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsNode).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsNode).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsNode).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // make sure that toppings subtotal starts out as $0.00
  const toppingsNode = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsNode).toHaveTextContent("0.00");

  // update toppings and check subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsNode).toHaveTextContent("1.50");

  const mAndMsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
  await user.click(mAndMsCheckbox);
  expect(toppingsNode).toHaveTextContent("3.00");

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingsNode).toHaveTextContent("4.50");

  // make sure that removals work as well
  await user.click(mAndMsCheckbox);
  expect(toppingsNode).toHaveTextContent("3.00");
});

describe("grand total", () => {
  test("starts at $0.00", () => {
    const { unmount } = render(<OrderEntry />);

    const grandTotalHeading = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotalHeading).toHaveTextContent("0.00");

    unmount();
  });

  test("updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotalHeading = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const fudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    // logRoles(container);
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotalHeading).toHaveTextContent("2.00");

    await user.click(fudgeCheckbox);
    expect(grandTotalHeading).toHaveTextContent("3.50");
  });

  test("updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotalHeading = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const fudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });

    await user.click(fudgeCheckbox);
    expect(grandTotalHeading).toHaveTextContent("1.50");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotalHeading).toHaveTextContent("5.50");
  });

  test("updates properly if an item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotalHeading = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const fudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    await user.click(fudgeCheckbox);
    expect(grandTotalHeading).toHaveTextContent("5.50");

    await user.click(fudgeCheckbox);
    expect(grandTotalHeading).toHaveTextContent("4.00");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotalHeading).toHaveTextContent("2.00");
  });
});
