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