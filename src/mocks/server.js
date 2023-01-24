// src/mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { setupWorker } from "msw";
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
// This configures a worker that can be used to start this service worker
// in development/production to mock API responses.
export const worker = setupWorker(...handlers);
