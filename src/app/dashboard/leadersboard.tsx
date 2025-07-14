"use client";

import { IContester } from "@/services/contesters/IContester";
import React from "react";

export default function Page(props: {
  data: IContester[];
}) {
  const { data } = props;

  return (
    <div className="h-full w-full bg-white">
      <div className="flex justify-center py-3 border-b border-gray-200">
        <p className="text-2xl font-medium text-gray-900">Leadersboard</p>
      </div>
      <div>
        {data.map(({ name, from, points }, index) => (
          <div
            key={index}
            className="flex py-4 border-b border-gray-200"
          >
            <p className="font-semibold text-base w-8 text-right">{index + 1}</p>
            <div className="flex grow px-3">
              <p className="font-semibold text-base text-right">{name}</p>
              <p className="font-medium text-sm px-3 text-right">[{from}]</p>
            </div>
            <p className="font-semibold text-base px-4 text-right">{points}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
