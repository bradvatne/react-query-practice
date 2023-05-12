"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftEllipsisIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "react-query";
import IssueItem from "./ui/IssueItem";

export interface IssueProps {
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

export default function Issues() {
  const issuesQuery = useQuery(["issues"], () =>
    fetch("https://ui.dev/api/courses/react-query/issues").then((res) =>
      res.json()
    )
  );

  const issues = issuesQuery.data;

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {issuesQuery.isSuccess &&
        issues.map((issue: IssueProps) => (
          <IssueItem issue={issue} key={issue.id} />
        ))}
    </ul>
  );
}
