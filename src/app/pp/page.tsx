"use client";

import React from "react";
import Setup from "./Setup";
import Voting from "./Voting";
import { listContesters } from "@/containers/Contesters/listContesters";
import { IContester } from "@/services/contesters/IContester";

export default function Page() {
  const [state, setState] = React.useState<{
    mobile: string;
    contesters: IContester[];
  }>({
    mobile: "",
    contesters: [],
  });

  const loadData = async () => {
    const contesters = await listContesters();
    setState({
      ...state,
      contesters,
    });
  };

  const handleSignedIn = (data: { mobile: string; }) => {
    setState({
      ...state,
      mobile: data.mobile,
    });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {state.mobile.length === 0 ? (
        <Setup
          onSignIn={handleSignedIn}
        />
      ) : (
        <Voting
          mobile={state.mobile}
          contesters={state.contesters}
        />
      )}
    </div>
  );
}
