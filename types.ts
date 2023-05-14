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

export type Tab = {
  id: string;
  name: string;
  color: string;
};

export interface Label {
  id: string;
  name: string;
  color: string;
}

type User = {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};
