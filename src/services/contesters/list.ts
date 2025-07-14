import { COLLECTION_NAME, Data } from "@/db";

export const list = async () => {
  const db = await Data.connectDB();
  const result = await db.collection(COLLECTION_NAME.Contesters).find().toArray();

  return result;
};
