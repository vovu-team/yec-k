"use client";

import React from "react";
import DialogBase from "@/containers/core/DialogBase";
import { IContester } from "@/services/contesters/IContester";

export default function EditContesterDialog({
  predata,
  open,
  onDeleted,
  onUpdated,
  onClose,
}: {
  predata: IContester;
  open: boolean;
  onDeleted: () => void;
  onUpdated: () => void;
  onClose: () => void;
}) {
  const [state, setState] = React.useState({
    name: predata.name,
    from: predata.from,
  });

  const handleContesterUpdated = async () => {
    const payloads = {
      _id: predata._id,
      name: state.name,
      from: state.from,
    };

    await fetch("/api/contesters", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloads),
    });

    onUpdated();

    setState({
      name: "",
      from: "",
    });
  };

  const handleContesterDeleted = async () => {
    const payloads = {
      _id: predata._id,
    };

    await fetch("/api/contesters", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloads),
    });

    onDeleted();

    setState({
      name: "",
      from: "",
    });
  };

  return (
    <DialogBase
      title="Edit Contester"
      open={open}
      onClose={onClose}
      deleteButton={{
        title: "Delete",
        onDelete: handleContesterDeleted,
      }}
      submitButton={{
        title: "Save",
        onSubmit: handleContesterUpdated,
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
  );
}
