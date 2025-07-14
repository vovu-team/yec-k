"use client";

import React from "react";
import DialogBase from "@/containers/core/DialogBase";
import { IContester } from "@/services/contesters/IContester";

export default function NewContesterButton({
  onCreated,
}: {
  onCreated: (data: IContester) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    name: "",
    from: "",
  });

  const handleClose = () => {
    setState({
      name: "",
      from: "",
    });
    setOpen(false);
  };

  const handleContesterCreated = async () => {
    const payloads = {
      name: state.name,
      from: state.from,
    };

    const response = await fetch("/api/contesters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloads),
    });
    const json = await response.json();

    setOpen(false);
    setState({
      name: "",
      from: "",
    });
    onCreated(json);
  };

  return (
    <>
      <button
        type="button"
        className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={() => setOpen(true)}
      >
        Add New
      </button>
      <DialogBase
        title="New Contester"
        open={open}
        onClose={handleClose}
        submitButton={{
          title: "Create",
          onSubmit: handleContesterCreated
        }}
      >
        <div className="py-1.5">
          <label className="block text-sm/6 font-medium text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              autoComplete="off"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
              value={state.name}
              onChange={(e) => {
                const nState = {
                  ...state,
                };

                nState.name = e.currentTarget.value;

                setState(nState);
              }}
            />
          </div>
        </div>

        <div className="py-1.5">
          <label className="block text-sm/6 font-medium text-gray-900">
            From
          </label>
          <div className="mt-2">
            <input
              id="from"
              name="from"
              type="text"
              placeholder="From"
              autoComplete="off"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
              value={state.from}
              onChange={(e) => {
                const nState = {
                  ...state,
                };

                nState.from = e.currentTarget.value;

                setState(nState);
              }}
            />
          </div>
        </div>
      </DialogBase>
    </>
  );
}
