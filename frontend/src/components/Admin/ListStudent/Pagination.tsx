import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
const Pagination = () => {
  const [active, setActive] = React.useState(1);

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
    } as any);

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="ml-14 text-xs text-gray-500">
        Showing 1 to 10 of 11 entries
      </div>
      <div className=" flex items-center">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeft size={25} />
          Previous
        </Button>
        <div className="flex items-center gap-2 ">
          <IconButton {...getItemProps(1)}>1</IconButton>
          <IconButton {...getItemProps(2)}>2</IconButton>
          <IconButton {...getItemProps(3)}>3</IconButton>
          <IconButton {...getItemProps(4)}>4</IconButton>
          <IconButton {...getItemProps(5)}>5</IconButton>
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === 5}
        >
          Next
          <ArrowRight size={25} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
