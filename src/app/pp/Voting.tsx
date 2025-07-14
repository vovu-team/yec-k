"use client";

import React from "react";
import { IContester } from "@/services/contesters/IContester";
import VoteDialog from "./VoteDialog";

export default function Voting(props: {
  mobile: string;
  contesters: IContester[];
}) {
  const { mobile, contesters } = props;
  const [open, setOpen] = React.useState(false);

  const handleVoted = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="flex h-16 px-6 items-center border-b border-gray-300">
        <p className="text-base font-semibold text-gray-900 grow">YEC KAN</p>
        <div className="flex items-center">
          <p className="font-medium text-gray-900">Point: </p>
          <p className="font-semibold text-gray-900 px-3">0</p>
          <button
            type="button"
            className="relative inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Add Points
          </button>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="py-20">
            <button
              type="button"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => setOpen(true)}
            >
              Vote
            </button>

            <VoteDialog
              predata={{
                contesters,
                mobile,
              }}
              open={open}
              onClose={() => setOpen(false)}
              onSubmit={handleVoted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
