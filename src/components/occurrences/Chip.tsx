import { OccurrenceStatus } from "@/types/occurrence";
import React from "react";

type ChipProps = {
  status: OccurrenceStatus;
} & React.HTMLAttributes<HTMLSpanElement>;

const Chip = (props: ChipProps) => {
  return (
    <span
      {...props}
      className={`${
        props.className
      } py-1 px-3 rounded-full text-sm font-medium ${
        props.status === OccurrenceStatus.OPENED
          ? "bg-green-100 text-green-800"
          : props.status === OccurrenceStatus.IN_PROGRESS
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {props.status}
      {props.children}
    </span>
  );
};

export default Chip;
