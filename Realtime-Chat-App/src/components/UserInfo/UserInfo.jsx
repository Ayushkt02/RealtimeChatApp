import React from "react";

export function UserInfo(props) {
  return (
    <>
      <div className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-700 hover:text-gray-700">
        <img
          className="inline-block h-12 w-12 rounded-full"
          src={props.name.name.name.multiFactor.user.photoURL}
          alt="Avatar"
        />
        <span className="flex flex-col pl-2">
          <span className="text-sm font-medium text-white ">
            {props.name.name.name.multiFactor.user.displayName}
          </span>
          <span className="text-sm font-medium text-gray-300">
            {props.name.name.name.multiFactor.user.email}
          </span>
        </span>
      </div>
    </>
  );
}
