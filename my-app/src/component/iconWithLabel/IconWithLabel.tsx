import React from "react";

interface Props {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const IconWithLabel = (props: Props) => {
  const { icon, label, onClick, isActive } = props;
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-4 cursor-pointer w-full py-2 px-4
        ${
          isActive
            ? "bg-[#6b3eb4] text-white"
            : "hover:bg-[#5c5c5c] text-[#d1d1d1]"
        }
      `}
    >
      <div className="text-inherit w-6 h-6">{icon}</div>
      <p className={`text-[16px] font-semibold text-inherit`}>{label}</p>
    </div>
  );
};

export default IconWithLabel;
