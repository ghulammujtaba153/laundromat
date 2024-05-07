import React from "react";
import { useState } from "react";

const TabBar = () => {
  return (
    <div className=" bg-primary-bg">
      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-primary-darkblue">
        <li class="me-2">
          <div>
            <a
              href="/products"
              aria-current="page"
              class="inline-block p-4  rounded-lg m-2 active hover:text-gray-600 hover:bg-primary-darkblue"
            >
              Machines
            </a>
          </div>
        </li>
        <li class="me-2">
          <div>
            <a
              href="/addproduct"
              class="inline-block p-4 rounded-lg m-2 hover:text-gray-600 hover:bg-primary-darkblue"
            >
              Add New Machine
            </a>
          </div>
        </li>
        <li class="me-2">
          <div>
            <a
              href="feedback"
              class="inline-block p-4 rounded-lg m-2 hover:text-gray-600 hover:bg-primary-darkblue"
            >
              Feed Back
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TabBar;
