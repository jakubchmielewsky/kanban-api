import { LRUCache } from "lru-cache";

export const cache = new LRUCache({
  max: 100000,
  ttl: 1 * 60 * 60 * 1000, // 1h
  updateAgeOnGet: true,
});
