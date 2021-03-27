import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import { rest } from "msw";
import { server } from "mocks/server";
import {
  calculateMetaMerchant,
  generateMerchants,
} from "mocks/responses/merchant";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Dashboard from "views/Dashboard";
import { DashboardProvider } from "store/dashboard";
import { SERVER_URL } from "services/utils";
import { MERCHANT_PAGE_SIZE } from "common/reactQuery";

const merchants = generateMerchants(20);
const queryCache = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

describe("Dashboard", () => {
  it("Error response", async () => {
    server.use(
      rest.get(`${SERVER_URL}/api/v1/merchant`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryCache}>
          <DashboardProvider page={0} size={MERCHANT_PAGE_SIZE}>
            <Dashboard />
          </DashboardProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    );
    await screen.findByText("Oops! Somethink went wrong.");
  });

  it("Loading", async () => {
    server.use(
      rest.get(`${SERVER_URL}/api/v1/merchant`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.delay(100),
          ctx.json({
            meta: calculateMetaMerchant(0, 20, merchants.length),
            results: merchants.slice(0 * 20, 0 * 20 + 20),
          })
        );
      })
    );
    render(
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryCache}>
          <DashboardProvider page={0} size={MERCHANT_PAGE_SIZE}>
            <Dashboard />
          </DashboardProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    );

    await screen.findByRole("progressbar");
    await waitFor(() => expect(screen.getByText("1-20 of 20")));
    expect(screen.queryAllByRole("progressbar").length).toBe(0);
  });

  describe("Sucessfull render", () => {
    beforeEach(() => {
      queryCache.clear();
      return render(
        <SnackbarProvider maxSnack={3}>
          <QueryClientProvider client={queryCache}>
            <DashboardProvider page={0} size={MERCHANT_PAGE_SIZE}>
              <Dashboard />
            </DashboardProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      );
    });

    it("initial render", async () => {
      await waitFor(() =>
        expect(screen.getByText("1-20 of 100")).toBeDefined()
      );
    });

    it("open create form", async () => {
      await waitFor(() =>
        expect(screen.getByText("1-20 of 100")).toBeDefined()
      );
      userEvent.click(
        screen.getByRole("button", {
          name: /create/i,
        })
      );
      await screen.findByRole("heading", {
        name: /create/i,
      });
      expect(
        screen.getByRole("button", {
          name: /submit/i,
        })
      ).toBeDisabled();
    });
  });
});
