import React from "react";
import Spinner from "../spinner/Spinner";

interface LogoutConfirmProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const LogoutPopup = (props: LogoutConfirmProps) => {
  const { isOpen, onConfirm, onCancel, isLoading } = props;

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center  bg-[#00000080] z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Confirm Logout
          </h2>
          <p className="mb-6 text-gray-700">Are you sure you want to logout?</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-gradient-to-r cursor-pointer from-[#6b3eb4] to-[#9d6bf0] text-white hover:brightness-110"
            >
              {isLoading ? <Spinner /> : "Logout"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default LogoutPopup;
