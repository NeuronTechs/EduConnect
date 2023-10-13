import { CheckCircle, MinusCircle, PlayCircle } from "@phosphor-icons/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";

interface IconProps {
  id: number;
  open: number;
}

const Icon = ({ id, open }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`h-5 w-5 transform ${
        id === open ? "rotate-180" : ""
      } transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

const Overview = () => {
  const [open, setOpen] = useState<number>(1);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  return (
    <div className="w-full">
      <div className="p-[10px]">
        <h1 className="font-semibold">Nội dung khóa học</h1>
        <p className="p-[5px_10px]">
          Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem
          các videos tại khóa này trước nhé.
        </p>
        <p className="p-[5px_10px]">
          <span className="font-semibold">4</span> chương •{" "}
          <span className="font-semibold">11</span> bài học • Thời lượng{" "}
          <span className="font-semibold">03 giờ 25 phút</span>
        </p>
        <div className="w-full px-3 p-[5px_10px]">
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(1)}>
              <div className="flex flex-col justify-between items-start opacity-100">
                <div className="text-[16px]">1. Khái niệm cơ bản?</div>
                <div className="text-[13px] font-normal">
                  15 phút để hoàn thành
                </div>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <ul>
                <li className="flex items-center justify-start text-[15px]">
                  <PlayCircle size={16} className="mr-3" />
                  1. Mô hình Client - Server là gì?
                </li>
                <li className="flex items-center justify-start">
                  <PlayCircle size={16} className="mr-3" />
                  2. Domain là gì? Tên miền là gì?
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(2)}>
              <div className="flex flex-col justify-between items-start opacity-100">
                <div className="text-[16px]">2. Môi trường, con người, IT</div>
                <div className="text-[13px] font-normal">
                  15 phút để hoàn thành
                </div>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <ul>
                <li className="flex items-center justify-start text-[15px]">
                  <PlayCircle size={16} className="mr-3" />
                  3. Mô hình Client - Server là gì?
                </li>
                <li className="flex items-center justify-start">
                  <PlayCircle size={16} className="mr-3" />
                  4. Domain là gì? Tên miền là gì?
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(3)}>
              <div className="flex flex-col justify-between items-start opacity-100">
                <div className="text-[16px]">3. Phương pháp và định hướng</div>
                <div className="text-[13px] font-normal">
                  1 tiếng để hoàn thành
                </div>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <ul>
                <li className="flex items-center justify-start text-[15px]">
                  <PlayCircle size={16} className="mr-3" />
                  5. Mô hình Client - Server là gì?
                </li>
                <li className="flex items-center justify-start">
                  <PlayCircle size={16} className="mr-3" />
                  6. Domain là gì? Tên miền là gì?
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(4)}>
              <div className="flex flex-col justify-between items-start opacity-100">
                <div className="text-[16px]">4. Hoàn thành khóa học</div>
                <div className="text-[13px] font-normal">
                  15 phút để hoàn thành
                </div>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <ul>
                <li className="flex items-center justify-start text-[15px]">
                  <PlayCircle size={16} className="mr-3" />
                  7. Mô hình Client - Server là gì?
                </li>
                <li className="flex items-center justify-start">
                  <PlayCircle size={16} className="mr-3" />
                  8. Domain là gì? Tên miền là gì?
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
        </div>
      </div>
      {/* Bạn sẽ học được gì? */}
      <div className="p-[10px]">
        <h1 className="font-semibold">Bạn sẽ học được gì?</h1>
        <ul className="flex flex-col lg:flex-row flex-wrap p-[5px_10px]">
          <li className="flex items-center justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            Các kiến thức cơ bản, nền móng của ngành IT
          </li>
          <li className="flex items-center justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            Các kiến thức cơ bản, nền móng của ngành IT
          </li>
          <li className="flex items-center justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            Các kiến thức cơ bản, nền móng của ngành IT
          </li>
          <li className="flex items-center justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            Các kiến thức cơ bản, nền móng của ngành IT
          </li>
          <li className="flex items-center justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            Các kiến thức cơ bản, nền móng của ngành IT
          </li>
          <li className="flex items-center justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            Các kiến thức cơ bản, nền móng của ngành IT
          </li>
        </ul>
      </div>
      {/* Yêu cầu */}
      <div className="p-[10px] gap-2">
        <h1 className="font-semibold">Yêu cầu</h1>
        <ul className="p-[5px_10px]">
          <li className="flex items-center justify-start basis-1/2">
            <MinusCircle weight="fill" size={16} className="mr-3" />
            Các kiến thức cơ bản, nền móng của ngành IT
          </li>
          <li className="flex items-center justify-start basis-1/2">
            <MinusCircle weight="fill" size={16} className="mr-3" />
            Các kiến thức cơ bản, nền móng của ngành IT
          </li>
          <li className="flex items-center justify-start basis-1/2">
            <MinusCircle weight="fill" size={16} className="mr-3" />
            Các kiến thức cơ bản, nền móng của ngành IT
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
