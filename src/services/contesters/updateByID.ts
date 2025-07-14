import { COLLECTION_NAME, Data } from "@/db";
import { ObjectId } from "mongodb";

export const updateByID = async ({
  _id,
  name,
  from,
}: {
  _id: string;
  name: string;
  from: string;
}) => {
  const db = await Data.connectDB();

  const filter = {
    _id: new ObjectId(_id),
  };

  await db.collection(COLLECTION_NAME.Contesters).updateOne(filter, {
    $set: {
      name,
      from,
    },
  });

  return {
    _id,
    name,
    from,
  };
};
