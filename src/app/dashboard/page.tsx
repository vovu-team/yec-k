"use client";

import React from "react";
import Leadersboard from "./leadersboard";
import { listContesters } from "@/containers/Contesters/listContesters";
import { IContester } from "@/services/contesters/IContester";

export default function Page() {
  const [state, setState] = React.useState<{
    contesters: IContester[];
  }>({
    contesters: [],
  });

  const loadData = async () => {
    const contesters = await listContesters();

    setState({
      ...state,
      contesters,
    });
  };

  React.useEffect(() => {
    loadData();

    const intervalID = setInterval(loadData, 1500);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 py-3 px-5">
        <h3 className="text-3xl font-medium text-gray-900">YEC</h3>
      </div>
      <div className="flex grow">
        <div className="grow bg-red-50">
          
        </div>
        <div className="w-1/3 min-w-80">
          <Leadersboard
            data={state.contesters}
          />
        </div>
      </div>
      <div className="h-15">
      </div>
    </div>
  );
}
