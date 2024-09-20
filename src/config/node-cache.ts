import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 60 * 60 * 9, // 9 hours
  checkperiod: 60 * 60 * 3, // 3 hours
});

export { cache };
