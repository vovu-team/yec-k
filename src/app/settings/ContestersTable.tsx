"use client";

import React from "react";
import { IContester } from "@/services/contesters/IContester";

export default function ContestersTable(props: {
  data: IContester[];
  onEdit: (index: number) => void;
}) {
  const { data, onEdit } = props;

  return (
    <div className="py-2">
      <table className="min-w-full bg-white divide-y divide-gray-300 border-y border-gray-300">
        <thead>
          <tr>
            <th scope="col" className="p-3 text-left text-sm font-semibold text-gray-900">
              Name
            </th>
            <th scope="col" className="p-3 text-left text-sm font-semibold text-gray-900">
              From
            </th>
            <th scope="col" className="p-3 text-left text-sm font-semibold text-gray-900">
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <div className="flex justify-center py-4 ">
                  <p className="text-sm font-semibold text-gray-900">No Data</p>
                </div>
              </td>
            </tr>
          ) : data.map((each, index) => (
            <tr
              key={each._id}
              className="even:bg-gray-50"
              onClick={() => onEdit(index)}
            >
              <td className="px-3 py-4 text-sm font-medium text-gray-900">{each.name}</td>
              <td className="px-3 py-4 text-sm font-medium text-gray-900">{each.from}</td>
              <td className="px-3 py-4 text-sm font-medium text-gray-900">{each.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
