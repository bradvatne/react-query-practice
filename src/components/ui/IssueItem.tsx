import useUserData from "@/helpers/useUserData";
import Image from "next/image";
import React, { FC, Fragment, ReactChild } from "react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { JsxElement } from "typescript";
import { useLabelData } from "@/helpers/useLabelData";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface IssueProps {
  id: string;
  title: string;
  number: number;
  status: string;
  assignee: string;
  comments: string[];
  createdBy: string;
  createdDate: Date;
  labels: Label[];
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

const IssueItem = ({ issue }: { issue: IssueProps }) => {
  const {
    id,
    title,
    number,
    status,
    assignee,
    comments,
    createdBy,
    createdDate,
    labels,
  } = issue;
  const assigneeInfo = useUserData(assignee);
  const createdByInfo = useUserData(createdBy);

  const getColorClass = (color: string) => {
    console.log(color);
    switch (color) {
      case "blue":
        return "sky";
      case "cyan":
        return "cyan";
      case "orange":
        return "orange";
      case "lime":
        return "green";
      case "white":
        return "slate";
      case "rebeccapurple":
        return "indigo";
      case "red":
        return "red";
      default:
        return "";
    }
  };

  const Label: any = ({
    label,
    children,
  }: {
    label: Label;
    children: JsxElement;
  }) => {
    const labelsQuery = useLabelData();
    if (labelsQuery.isLoading) return null;
    const labelObj = labelsQuery?.data?.find(
      (queryLabel: any) => queryLabel.id == label
    );
    console.log(labelObj);
    if (!labelObj) return null;

    return (
      <p
        key={label.id}
        className={`rounded-md  whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xxs font-medium ring-${getColorClass(labelObj.color)}-100 ring-1 ring-inset bg-${getColorClass(labelObj.color)}-300`}
      >
        {labelObj.id}
      </p>
    );
  };

  return (
    <li
      key={id}
      className="flex items-center justify-between gap-x-6 py-4 flex-grow"
    >
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {title}
          </p>

          {labels.map((label) => (
            <Label key={parseInt(label.id)} label={label}>
              {label.name}
            </Label>
          ))}
        </div>
        <div className="mt-1 flex items-center text-xs leading-5 text-gray-500">
          <p className="truncate">
            Opened by{" "}
            {createdByInfo?.isSuccess ? `${createdByInfo.data.name} at` : "..."}
          </p>
          <p className="pl-1 whitespace-nowrap">
            <time>
              {}
              {new Date(createdDate).toLocaleTimeString()}
            </time>
          </p>
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        {assigneeInfo?.data?.profilePictureUrl && (
          <Image
            height={24}
            width={24}
            className="rounded-full shadow-sm"
            alt={assigneeInfo?.data?.name}
            src={assigneeInfo?.data?.profilePictureUrl ?? "/blank_profile.webp"}
          />
        )}
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="w-[16px] h-[16px] text-gray-500">
            <ChatBubbleLeftEllipsisIcon />
          </div>
          <span className="text-xxs"></span>
        </div>
      </div>
    </li>
  );
};

export default IssueItem;
