"use client";

import React from "react";

export default function Setup(props: {
  onSignIn: (data: { mobile: string; }) => void;
}) {
  const { onSignIn } = props;

  const [state, setState] = React.useState({
    mobile: "",
  });

  const handleMobileChanged = (value: string) => {
    let refinedVal = "";
    const rxMobile = /[0-9]/;

    for (let i = 0; i < value.length; i++) {
      if (rxMobile.test(value[i]))
        refinedVal += value[i];
    }

    setState({
      ...state,
      mobile: refinedVal,
    });
  };

  const handleSubmitted = () => {
    onSignIn({ mobile: state.mobile });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to join our event
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label htmlFor="mobile" className="block text-sm/6 font-medium text-gray-900">
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                id="mobile"
                name="mobile"
                type="text"
                required
                autoComplete="mobile"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                value={state.mobile}
                onChange={(e) => handleMobileChanged(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={handleSubmitted}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
