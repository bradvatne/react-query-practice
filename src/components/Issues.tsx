"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import IssueItem from "./ui/IssueItem";
import Header from "./Header";
import { Label, IssueProps } from "../../types";

export default function Issues() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [status, setStatus] = useState("");

  const issuesQuery = useQuery(["issues"], () =>
    fetch("https://ui.dev/api/courses/react-query/issues").then((res) =>
      res.json()
    )
  );

  const issues = issuesQuery.data;

  return (
    <>
      <Header
        selected={labels}
        toggle={(label: Label) =>
          setLabels((currentLabels: Label[]) =>
            currentLabels?.includes(label)
              ? currentLabels?.filter((currentLabel) => currentLabel !== label)
              : currentLabels.concat(label)
          )
        }
      />
      <ul role="list" className="divide-y divide-gray-100">
        {issuesQuery.isSuccess &&
          issues.map((issue: IssueProps) => (
            <IssueItem issue={issue} key={issue.id} />
          ))}
      </ul>
    </>
  );
}
