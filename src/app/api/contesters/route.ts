import { NextRequest } from "next/server";
import { Contesters } from "@/services/contesters";

export const GET = async () => {
  const data = await Contesters.list();

  return Response.json(data);
};

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  const data = await Contesters.createNew(json);

  return Response.json(data);
};

export const PUT = async (request: NextRequest) => {
  const json = await request.json();
  const data = await Contesters.updateByID(json);

  return Response.json(data);
};

export const DELETE = async (request: NextRequest) => {
  const json = await request.json();
  const data = await Contesters.deleteByID(json);

  return Response.json(data);
};
