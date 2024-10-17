import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    (!disabled ? <button

      className={` rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button> :
    <div>
      <div

        className={` rounded-lg bg-gray-500 ${textColor} ${className}`}
        {...props}
      >
        {children} 
      </div>*Only admin Can post</div>
    )
  );
}
