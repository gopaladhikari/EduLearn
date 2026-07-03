import { ApiResponse } from "@/utils/api-responses.js";
import type { Response, Request } from "express";
import { dbConnection } from "@/utils/connect-to-db.js";
import os from "os";
import { cache } from "@/utils/redis.js";

const getReadyStatus = (number: number) => {
  switch (number) {
    case 0:
      return "Disconnected";
    case 1:
      return "Connected";
    case 2:
      return "Connecting";
    case 3:
      return "Disconnected";
    default:
      return "Unknown";
  }
};

export const healthCheck = async (_req: Request, res: Response) => {
  const dbStatus = dbConnection.getConnectionStatus();

  let redisHealth = {
    status: "Disconnected",
    latency_ms: null as number | null,
    memory_usage: null as string | null,
    connected_clients: null as number | null,
    version: null as string | null,
  };

  const start = Date.now();
  const pong = await cache.client.ping();
  const latency = Date.now() - start;

  if (pong === "PONG") {
    const infoRaw = await cache.client.info("memory", "clients", "server");

    const usedMemory = infoRaw.match(/used_memory_human:(.*)/)?.[1]?.trim();
    const connectedClients = infoRaw
      .match(/connected_clients:(.*)/)?.[1]
      ?.trim();
    const redisVersion = infoRaw.match(/redis_version:(.*)/)?.[1]?.trim();

    redisHealth = {
      status: "Connected",
      latency_ms: latency,
      memory_usage: usedMemory || "Unknown",
      connected_clients: Number(connectedClients) || 0,
      version: redisVersion || "Unknown",
    };
  }

  const healthStatus = {
    status: "Ok",
    timestamps: new Date().toISOString(),
    services: {
      database: {
        status: dbStatus.isConnected ? "Connected" : "Disconnected",
        details: {
          ...dbStatus,
          readyStatus: getReadyStatus(dbStatus.isReady),
        },
      },
      server: {
        status: "Ok",
        uptime: process.uptime(),
        memory_usage: {
          rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
          heap_used: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
        },
        platform: {
          os: process.platform,
          arch: process.arch,
          node_version: process.version,
        },
        load_average: os.loadavg(),
      },

      redis: redisHealth,
    },
  };

  const constHttpStatus =
    healthStatus.services.database.status === "Connected" ? 200 : 503;

  res
    .status(constHttpStatus)
    .json(new ApiResponse(constHttpStatus, "OK", healthStatus));
};
