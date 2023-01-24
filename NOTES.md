# Server Error is displayed on Order Confirmation Page

## What to render?

`<OrderConfirmation />`

## Pass props?

Yes, we can mock `setOrderPhase` and pass it

## Wrap render?

This component does make use of context from `useOrderDetails`, so we'll need to wrap it in the provider (do our test-utils import)

## Which file for tests?

new file: `src/pages/confirmation/tests/OrderConfirmation.test.js`

## What to test?

Test that an error is displayed if the server doesn't give a successful response

## How to test?

use the msw `resetHandlers` function to override the post request response so that we get an error back from the server when posting to the database.

## Do we need async/await?

Yes, because we're sending a post request which will return a promise, we'll need to use an `async` testing callback with an `await` to confirm that we see an error message after getting the error response.

# Displays an image for each scoop from the server

## What to render?

`<Options />` should display each `<ScoopOption />`

## Pass props?

yes, we'll need `optionType="scoops"` so our component knows to fetch scoops

## Wrap render?

yes, our `ScoopOption` component needs to be able to access the context to update the count, so we'll use our custom import with the context provider wrapper.

## Which file for tests?

src/pages/entry/test/Options.test.jsx

## What to test?

test that an image is displayed with a source matching the imagePath stored in our msw mocks.

## How to test?

We'll need to find all elements by role image and expect there to be 2 of them (because our msw handler returns an array of 2 scoop types)

## Do we need async/await?

yes, because we have a fetch going on here, we'll need to make our callback async