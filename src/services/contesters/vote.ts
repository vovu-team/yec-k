import { COLLECTION_NAME, Data } from "@/db";
import { ObjectId } from "mongodb";

export const vote = async (payloads: {
  mobile: string;
  contesterID: string;
  points: number;
}) => {
  const {
    mobile,
    contesterID,
    points,
  } = payloads;

  const db = await Data.connectDB();

  await db.collection(COLLECTION_NAME.Contesters).updateOne({
    _id: new ObjectId(contesterID),
  }, {
    $inc: { points },
  });

  await db.collection(COLLECTION_NAME.Transactions).insertOne({
    mobile,
    contesterID,
    points,
    time: new Date(),
  });

  return {
    contesterID,
    points,
  };
};
