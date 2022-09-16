import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const prisma = new PrismaClient({ log: ["query"] });

const app = express();
app.use(cors());

app.use(express.json());

// route to get games list
app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json(games);
});

// route to create an ad for a game
app.post("/games/:id/ads", async (request, response) => {
  const gameId: string = request.params.id;
  const body = request.body;

  const newAd = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      discord: body.discord,
      yearsPlaying: body.yearsPlaying,
      useVoiceChannel: body.useVoiceChannel,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
    },
  });

  return response.status(201).json(newAd);
});

// route to get ads by game id
app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

// route to get the discord nick by an ad id
app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const discord = await prisma.ad.findUnique({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.json(discord);
});

app.listen(3333);
