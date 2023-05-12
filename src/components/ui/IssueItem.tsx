import useUserData from "@/helpers/useUserData";
import { Menu, Transition } from "@headlessui/react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";

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
          <p className="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset">
            {status}
          </p>
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
        <a
          href={`/${title}`}
          className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
        >
          View issue<span className="sr-only">, {title}</span>
        </a>
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">Open options</span>
            <ChatBubbleLeftEllipsisIcon
              className="h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    Edit<span className="sr-only">, {title}</span>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    Move<span className="sr-only">, {title}</span>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    Delete<span className="sr-only">, {title}</span>
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
};

export default IssueItem;
