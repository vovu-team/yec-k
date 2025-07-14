"use client";

import React from "react";
import DialogBase from "@/containers/core/DialogBase";
import { IContester } from "@/services/contesters/IContester";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function VoteDialog({
  predata,
  open,
  onSubmit,
  onClose,
}: {
  predata: {
    mobile: string;
    contesters: IContester[];
  };
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
}) {
  const {
    mobile,
    contesters,
  } = predata;

  const [state, setState] = React.useState({
    _id: "",
    points: 0
  });

  const handleSelect = async (value: string) => {
    setState({
      ...state,
      _id: value,
    });
  };

  const handlePointsChanged = async (value: string) => {
    const pts = Number(value);

    if (!Number.isNaN(pts)) {
      setState({
        ...state,
        points: pts,
      });
    }
  };

  const handleVoting = async () => {
    const payloads = {
      mobile,
      contesterID: state._id,
      points: state.points,
    };

    fetch("/api/voting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloads),
    });
    
    onSubmit();
  };

  return (
    <DialogBase
      title="Vote"
      open={open}
      onClose={onClose}
      submitButton={{
        title: "Vote",
        onSubmit: handleVoting
      }}
    >
      <div className="py-1.5">
        <label htmlFor="for" className="block text-sm/6 font-medium text-gray-900">
          Vote For
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="for"
            name="for"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
            value={state._id}
            onChange={(e) => {
              handleSelect(e.currentTarget.value);
            }}
          >
            <option key="0" value="">Select One</option>
            {contesters.map((each) => (
              <option key={each._id} value={each._id}>{each.name}</option>

            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </div>
      </div>

      <div className="py-1.5">
        <label htmlFor="points" className="block text-sm/6 font-medium text-gray-900">
          Points
        </label>
        <div className="mt-2">
          <input
            id="points"
            name="points"
            type="number"
            placeholder="Points"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
            value={state.points}
            onChange={(e) => handlePointsChanged(e.currentTarget.value)}
          />
        </div>
      </div>
    </DialogBase>
  );
}
