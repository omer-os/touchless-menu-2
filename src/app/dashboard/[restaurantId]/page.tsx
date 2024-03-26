import React from "react";

export default function page({
  params,
}: {
  params: {
    restaurantId: string;
  };
}) {
  return <div>{JSON.stringify(params)}</div>;
}
