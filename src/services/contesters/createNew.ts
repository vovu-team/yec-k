import { COLLECTION_NAME, Data } from "@/db";
import { IContester } from "./IContester";

export const createNew = async (payloads: {
  name: string;
  from: string;
}): Promise<IContester> => {
  const {
    name,
    from,
  } = payloads;

  const db = await Data.connectDB();
  const data = {
    name,
    from,
    points: 0,
  };

  const result = await db.collection(COLLECTION_NAME.Contesters).insertOne(data);

  return {
    _id: result.insertedId.toString(),
    ...data,
  };
};
