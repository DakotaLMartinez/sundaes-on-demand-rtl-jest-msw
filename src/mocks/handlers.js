import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "Chocolate",
          imagePath:
            "https://res.cloudinary.com/dnocv6uwb/image/upload/v1674589142/rtl-udemy-course-demo-images/chocolate.png",
        },
        {
          name: "Vanilla",
          imagePath:
            "https://res.cloudinary.com/dnocv6uwb/image/upload/v1674589143/rtl-udemy-course-demo-images/vanilla.png",
        },
        {
          name: "Salted Caramel",
          imagePath:
            "https://res.cloudinary.com/dnocv6uwb/image/upload/v1674589143/rtl-udemy-course-demo-images/salted-caramel.png",
        },
        {
          name: "Mint Chip",
          imagePath:
            "https://res.cloudinary.com/dnocv6uwb/image/upload/v1674589143/rtl-udemy-course-demo-images/mint-chip.png",
        },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "Cherries",
          imagePath:
            "https://res.cloudinary.com/dnocv6uwb/image/upload/v1674589143/rtl-udemy-course-demo-images/cherries.png",
        },
        {
          name: "M&Ms",
          imagePath:
            "https://res.cloudinary.com/dnocv6uwb/image/upload/v1674589143/rtl-udemy-course-demo-images/m-and-ms.png",
        },
        {
          name: "Hot fudge",
          imagePath:
            "https://res.cloudinary.com/dnocv6uwb/image/upload/v1674589143/rtl-udemy-course-demo-images/hot-fudge.png",
        },
        {
          name: "Mochi",
          imagePath:
            "https://res.cloudinary.com/dnocv6uwb/image/upload/v1674589143/rtl-udemy-course-demo-images/mochi.png",
        },
        {
          name: "Peanut Butter Cups",
          imagePath:
            "https://res.cloudinary.com/dnocv6uwb/image/upload/v1674589143/rtl-udemy-course-demo-images/peanut-butter-cups.png",
        },
        {
          name: "Gummi Bears",
          imagePath:
            "https://res.cloudinary.com/dnocv6uwb/image/upload/v1674589143/rtl-udemy-course-demo-images/gummi-bears.png",
        },
      ])
    );
  }),
  rest.post("http://localhost:3030/order", (req, res, ctx) => {
    const orderNumber = Math.floor(Math.random() * 10000000000);
    return res(ctx.status(201), ctx.json({ orderNumber }));
  }),
];
