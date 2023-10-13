import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { ArrowDown } from "@phosphor-icons/react";
const TABLE_HEAD = ["ID", "Số tiền", "Ngày", "Trạng thái", "Tài khoản"];
const headers = [
  { label: "ID", key: "id" },
  { label: "Số tiền", key: "amount" },
  { label: "Ngày", key: "date" },
  { label: "Trạng thái", key: "status" },
  { label: "Loại thẻ", key: "account" },
  { label: "Số tài khoản", key: "accountNumber" },
  { label: "Ngày hết hạn", key: "expiry" },
];
const TABLE_ROWS = [
  {
    id: "1",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    id: "2",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    id: "3",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    id: "4",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    id: "5",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    id: "6",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];
const Payout = () => {
  const [pageActive, setPageActive] = useState<number>(1);
  const handlePageActive = (page: number) => {
    setPageActive(page);
  };

  return (
    <div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lịch sử giao dịch
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <CSVLink
                data={TABLE_ROWS}
                headers={headers}
                filename={"report_payout.csv"}
                className="flex items-center gap-3 bg-gray-800 text-white px-3 py-2 rounded-md"
                target="_blank"
              >
                <ArrowDown strokeWidth={2} className="h-4 w-4" /> Tải xuống
              </CSVLink>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                (
                  { id, amount, date, status, account, accountNumber, expiry },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {id}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {amount}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={status}
                            color={
                              status === "paid"
                                ? "green"
                                : status === "pending"
                                ? "amber"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                            <Avatar
                              src={
                                account === "visa"
                                  ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                  : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                              }
                              size="sm"
                              alt={account}
                              variant="square"
                              className="h-full w-full object-contain p-1"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal capitalize"
                            >
                              {account.split("-").join(" ")} {accountNumber}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {expiry}
                            </Typography>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
          <Button
            variant="outlined"
            size="sm"
            className="mr-3"
            onClick={() => {
              setPageActive((prev) => prev - 1);
            }}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton
              variant={pageActive === 1 ? "outlined" : "text"}
              size="sm"
              onClick={() => handlePageActive(1)}
              className="hover:outline"
            >
              1
            </IconButton>
            <IconButton
              variant={pageActive === 2 ? "outlined" : "text"}
              size="sm"
              onClick={() => handlePageActive(2)}
              className="hover:outline"
            >
              2
            </IconButton>
            <IconButton
              variant={pageActive === 3 ? "outlined" : "text"}
              size="sm"
              onClick={() => handlePageActive(3)}
              className="hover:outline"
            >
              3
            </IconButton>
          </div>
          <Button
            variant="outlined"
            size="sm"
            className="ml-3"
            onClick={() => {
              setPageActive((prev) => prev + 1);
            }}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Payout;
