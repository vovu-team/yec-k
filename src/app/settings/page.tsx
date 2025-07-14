"use client";

import React from "react";
import { IContester } from "@/services/contesters/IContester";
import { ReloadButton } from "@/containers/core/ReloadButton";
import ContestersTable from "./ContestersTable";
import NewContesterButton from "./NewContesterButton";
import EditContesterDialog from "./EditContesterDialog";
import { listContesters } from "@/containers/Contesters/listContesters";

export default function Page() {
  const [state, setState] = React.useState<{
    contesters: IContester[];
  }>({
    contesters: [],
  });
  const [isLoading, setLoading] = React.useState(false);
  const [editContester, setEditContester] = React.useState<IContester | undefined>(undefined);

  const loadData = async () => {
    setLoading(true);

    const contesters = await listContesters();

    setState({
      ...state,
      contesters,
    });

    setLoading(false);
  };

  const handleEditContesterOpened = (index: number) => {
    setEditContester(state.contesters[index]);
  };

  const handleEditContesterUpdated = async () => {
    await loadData();
    setEditContester(undefined);
  };

  const handleEditContesterDeleted = async () => {
    await loadData();
    setEditContester(undefined);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="border-b border-gray-200 px-4 sm:px-6 py-3">
        <h3 className="text-xl font-medium text-gray-900">Settings</h3>
      </div>
      <div className="px-4 sm:px-6 py-3">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Contesters</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the contesters in the event.
            </p>
          </div>
          <div className="flex gap-x-2">
            <NewContesterButton
              onCreated={() => loadData()}
            />
            <ReloadButton
              isLoading={isLoading}
              onClick={loadData}
            />
          </div>
        </div>
        <div className="mt-4">
          <ContestersTable
            data={state.contesters}
            onEdit={handleEditContesterOpened}
          />
        </div>
      </div>
      {editContester && (<EditContesterDialog
        predata={editContester}
        open={editContester !== undefined}
        onDeleted={handleEditContesterDeleted}
        onUpdated={handleEditContesterUpdated}
        onClose={() => setEditContester(undefined)}
      />)}
    </div>
  );
}
