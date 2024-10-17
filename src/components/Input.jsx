import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", curLimit, limit,maxSize, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <span>{label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}</span>

        <span>
          {(curLimit && curLimit > 0) ? 
          <>
            <span className={`${curLimit > limit && "text-red-500"}`}>{curLimit}</span>/{limit}
          </> : <></>}
          {maxSize && <span>*file size &lt; {maxSize}</span> }
        </span>
      </div>
      <input
        type={type}
        className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
        ref={ref}
        {...props}
        id={id}
      ></input>
    </div>
  );
});

export default Input;
