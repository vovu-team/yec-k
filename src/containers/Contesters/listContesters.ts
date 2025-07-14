import { IContester } from "@/services/contesters/IContester";

export const listContesters = async () => {
  const response = await fetch("/api/contesters");
  let list: IContester[] = await response.json();

  list = list.sort((a, b) => b.points - a.points);

  return list;
};
