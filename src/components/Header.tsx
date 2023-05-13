"use client";
import { Listbox, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  BarsArrowUpIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";

//import useQueory return type

const tabs = [
  { name: "Open", href: "#", current: true },
  { name: "Closed", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Tab = {
  id: string;
  name: string;
  color: string;
};

//function to capitalize first letter of string

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Header() {
  const [currentTab, setCurrentTab] = useState<string | undefined>(undefined);
  const tabsQuery = useQuery(["tabs"], () => {
    return fetch("https://ui.dev/api/courses/react-query/labels").then((res) =>
      res.json()
    );
  });

  return (
    <div className="border-b border-gray-200 sm:flex sm:justify-between py-4">
      <div className="lg:hidden sm:items-baseline">
        <Listbox value={currentTab} onChange={setCurrentTab}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-semibold leading-6 text-gray-900">
                Issues
              </Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="lg:hidden relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <span className="block truncate">
                    {currentTab ?? "Show All"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="lg:hidden absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {tabsQuery.isSuccess &&
                      tabsQuery?.data?.map((tab: Tab) => (
                        <Listbox.Option
                          key={tab.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={capitalizeFirstLetter(tab.name)}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {capitalizeFirstLetter(tab.name)}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <div className="hidden lg:flex sm:items-baseline">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Issues
        </h3>
        <div className="mt-4 sm:ml-10 sm:mt-0">
          <nav className=" -mb-px  space-x-8">
            {tabsQuery.isSuccess &&
              tabsQuery?.data?.map((tab: Tab) => (
                <a
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.name)}
                  className={classNames(
                    currentTab === tab.name
                      ? "border-indigo-500 text-indigo-600 hover:cursor-pointer"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:cursor-pointer",
                    "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                  )}
                  aria-current={"page"}
                >
                  {capitalizeFirstLetter(tab.name)}
                </a>
              ))}
          </nav>
        </div>
      </div>
      <div className="mt-3 sm:ml-4 sm:mt-0">
        <label htmlFor="mobile-search-candidate" className="sr-only">
          Search
        </label>
        <label htmlFor="desktop-search-candidate" className="sr-only">
          Search
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="mobile-search-candidate"
              id="mobile-search-candidate"
              className="block w-full rounded-none rounded-l-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
              placeholder="Search"
            />
            <input
              type="text"
              name="desktop-search-candidate"
              id="desktop-search-candidate"
              className="hidden w-full rounded-none rounded-l-md border-0 py-2 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
              placeholder="Search candidates"
            />
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <BarsArrowUpIcon
              className="-ml-0.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Sort
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
