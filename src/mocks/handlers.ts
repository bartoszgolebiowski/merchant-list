import { rest } from "msw";
import { SERVER_URL } from "services/utils";
import { calculateMetaBids, generateBids } from "./responses/bids";
import { generateMerchants, calculateMetaMerchant } from "./responses/merchant";
import { MerchantFormValues } from "types";

const MOCK_DATA_QUANTITY = 100;

const merchants = generateMerchants(MOCK_DATA_QUANTITY);

export const handlers = [
  rest.get(`${SERVER_URL}/api/v1/merchant`, (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page"));
    const size = Number(req.url.searchParams.get("size"));
    return res(
      ctx.status(200),
      ctx.json({
        meta: calculateMetaMerchant(page, size, merchants.length),
        results: merchants.slice(page * size, page * size + size),
      })
    );
  }),
  rest.post(`${SERVER_URL}/api/v1/merchant`, (req, res, ctx) => {
    const body = req.body as MerchantFormValues;
    if (body.id === undefined) {
      body.id = String(merchants.length + 1);
      //@ts-ignore
      merchants.push(body);
      return res(ctx.status(200), ctx.json(body));
    }
    const index = merchants.findIndex((el) => el.id === body.id);
    if (!~index) return res(ctx.status(400));
    //@ts-ignore
    merchants[index] = body;
    return res(ctx.status(200), ctx.json(body));
  }),
  rest.get(`${SERVER_URL}/api/v1/merchant/:id/bids`, (req, res, ctx) => {
    const { id } = req.params;
    const bids = generateBids(id, MOCK_DATA_QUANTITY);
    const page = Number(req.url.searchParams.get("page"));
    const size = Number(req.url.searchParams.get("size"));

    return res(
      ctx.status(200),
      ctx.json({
        meta: calculateMetaBids(page, size, bids.length),
        results: bids.slice(page * size, page * size + size),
      })
    );
  }),
  rest.delete(`${SERVER_URL}/api/v1/merchant/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const index = merchants.findIndex((el) => el.id === id);
    if (!~index) return res(ctx.status(400));
    merchants.splice(index, 1);
    return res(ctx.status(200), ctx.json({ status: "deleted" }));
  }),
];
