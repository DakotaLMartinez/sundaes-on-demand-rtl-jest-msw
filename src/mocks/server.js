// src/mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { setupWorker } from "msw";
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

export const worker = setupWorker(...handlers);