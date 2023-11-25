import { Pencil } from "@phosphor-icons/react";
import React from "react";

const InputEditTitle = (props: {
  value?: string;
  onSubmit?: (data: string) => void;
  className?: string;
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>(props.value || "");
  const [enableEditTitle, setEnableEditTitle] = React.useState<boolean>(false);
  React.useEffect(() => {
    // if the onSubmit callback is defined
    if (props.onSubmit) {
      inputRef.current?.focus();
      // and if the enableEditTitle state is false
      if (enableEditTitle === false) {
        // and if the value state is not equal to the value prop
        if (value !== props.value) {
          // then call the onSubmit callback with the value state
          props.onSubmit(value);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableEditTitle]);
  return (
    <div>
      {!enableEditTitle ? (
        <div
          className="flex items-center justify-start gap-2"
          onClick={() => setEnableEditTitle(true)}
        >
          <h5
            className={
              props.className
                ? props.className
                : "text-black font-bold text-sm "
            }
          >
            {value}
          </h5>
          <Pencil size={15} className="text-gary-500" />
        </div>
      ) : (
        <input
          className="border border-gray-300 rounded-md px-2"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setEnableEditTitle(false)}
        />
      )}
    </div>
  );
};

export default InputEditTitle;
