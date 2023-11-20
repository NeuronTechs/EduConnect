// Calendar.js

import { useEffect, useState } from "react";
const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Calendar() {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState<number[][]>([]);
  const [month, setmonth] = useState(date.getMonth());
  const [year, setyear] = useState(date.getFullYear());
  useEffect(() => {
    let firstDay = new Date(year, month, 1).getDay();
    if (firstDay === 0) firstDay = 7;
    const array = [];
    let items = [];
    for (let index = 0; index < firstDay - 1; index++) {
      items.push(0);
    }
    for (let index = 1; index <= daysOfMonth[month]; index++) {
      items.push(index);
      if (items.length === 7) {
        array.push(items);
        items = [];
      }
    }
    array.push(items);
    setDays(array);
  }, [month]);

  return (
    <>
      {" "}
      <div className="flex items-center justify-center py-1 px-1">
        <div className=" w-full shadow-lg">
          <div className="md:p-3 md:pb-2 p-1 dark:bg-gray-800 bg-white rounded-t">
            <div className="px-1 flex items-center justify-between">
              <h1 className="text-xs font-bold dark:text-gray-100 text-gray-800">
                {month + 1} {year}
              </h1>
              <div className="flex items-center text-gray-800 dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => {
                    if (month - 1 < 0) {
                      setmonth(11);
                      setyear(year - 1);
                    } else {
                      setmonth(month - 1);
                    }
                  }}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler ml-3 icon-tabler-chevron-right"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => {
                    if (month + 1 === 12) {
                      setmonth(0);
                      setyear(year + 1);
                    } else {
                      setmonth(month + 1);
                    }
                  }}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>
                      <div className="w-full flex justify-center">
                        <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                          Mo
                        </p>
                      </div>
                    </th>
                    <th>
                      <div className="w-full flex justify-center">
                        <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                          Tu
                        </p>
                      </div>
                    </th>
                    <th>
                      <div className="w-full flex justify-center">
                        <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                          We
                        </p>
                      </div>
                    </th>
                    <th>
                      <div className="w-full flex justify-center">
                        <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                          Th
                        </p>
                      </div>
                    </th>
                    <th>
                      <div className="w-full flex justify-center">
                        <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                          Fr
                        </p>
                      </div>
                    </th>
                    <th>
                      <div className="w-full flex justify-center">
                        <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                          Sa
                        </p>
                      </div>
                    </th>
                    <th>
                      <div className="w-full flex justify-center">
                        <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                          Su
                        </p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {days.map((week, index) => {
                    return (
                      <tr key={index}>
                        {week.map((day) => {
                          if (day === 0)
                            return (
                              <td className="pt-6">
                                <div className="px-1 py-1 cursor-pointer flex w-full justify-center" />
                              </td>
                            );
                          else if (day === date.getDate())
                            return (
                              <td key={day}>
                                <div className="w-full h-full">
                                  <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                    <p className="text-xs  w-6 h-6 mt-5 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full">
                                      {day}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            );
                          else
                            return (
                              <td key={day} className="pt-6">
                                <div
                                  className="px-1 py-1 cursor-pointer flex w-full justify-center"
                                  onClick={() => {
                                    setDate(new Date(year, month, day));
                                  }}
                                >
                                  <p className="text-xs text-gray-500 dark:text-gray-100 font-medium">
                                    {day}
                                  </p>
                                </div>
                              </td>
                            );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calendar;
