import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT as string),
  family: 4,
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB as string),
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("🚀 Connected to Redis");
});

redis.on("error", (err) => {
  console.error("💥 Redis error:", err);
});

export default redis;
