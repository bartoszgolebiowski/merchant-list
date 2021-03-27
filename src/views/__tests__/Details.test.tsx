import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import { server } from "mocks/server";

import { render, screen, waitFor } from "@testing-library/react";

import Details from "views/Details";
import { SERVER_URL } from "services/utils";
import { calculateMetaBids, generateBids } from "mocks/responses/bids";

const bids = generateBids(1, 20);

const queryCache = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

describe("Details", () => {
  it("Error response", async () => {
    server.use(
      rest.get(`${SERVER_URL}/api/v1/merchant/:id/bids`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(
      <MemoryRouter initialEntries={["details/1"]}>
        <SnackbarProvider maxSnack={3}>
          <QueryClientProvider client={queryCache}>
            <Details />
          </QueryClientProvider>
        </SnackbarProvider>
      </MemoryRouter>
    );
    await screen.findByText("Oops! Somethink went wrong.");
  });

  it("Loading", async () => {
    server.use(
      rest.get(`${SERVER_URL}/api/v1/merchant/:id/bids`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.delay(100),
          ctx.json({
            meta: calculateMetaBids(0, 20, bids.length),
            results: bids.slice(0, 20),
          })
        );
      })
    );
    render(
      <MemoryRouter initialEntries={["details/1"]}>
        <SnackbarProvider maxSnack={3}>
          <QueryClientProvider client={queryCache}>
            <Details />
          </QueryClientProvider>
        </SnackbarProvider>
      </MemoryRouter>
    );

    await screen.findByRole("progressbar");
    await waitFor(() => expect(screen.getByText("1-20 of 20")));
    expect(screen.queryAllByRole("progressbar").length).toBe(0);
  });

  describe("Sucessfull render", () => {
    beforeEach(() => {
      queryCache.clear();
      return render(
        <MemoryRouter initialEntries={["details/1"]}>
          <SnackbarProvider maxSnack={3}>
            <QueryClientProvider client={queryCache}>
              <Details />
            </QueryClientProvider>
          </SnackbarProvider>
        </MemoryRouter>
      );
    });

    it("initial render", async () => {
      await waitFor(() => expect(screen.getByText("0-0 of 0")).toBeDefined());
      await waitFor(() =>
        expect(screen.getByText("1-20 of 100")).toBeDefined()
      );
    });
  });
});
