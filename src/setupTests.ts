import "@testing-library/jest-dom";
import { server } from "mocks/server";
jest.setTimeout(20000)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
