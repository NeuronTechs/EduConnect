import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Avatar,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { ArrowDown } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { SliceState } from "@/types/type";
import { transaction } from "@/components/Profile/CheckoutHistory";
import * as teacherApi from "../api/teacherApi/teacherApi";
import { formatCurrency, formatTimeStamp } from "@/utils/const";

const TABLE_HEAD = [
  "ID",
  "Số tiền",
  "Ngày",
  "Trạng thái",
  "Tài khoản",
  "Khóa học",
  "Học viên",
];
const headers = [
  { label: "transaction_id", key: "transaction_id" },
  { label: "Số tiền", key: "amount" },
  { label: "Khóa học", key: "title" },
  { label: "Học viên", key: "full_name" },
  { label: "Ngày", key: "createdAt" },
  { label: "Trạng thái", key: "status" },
  { label: "Loại thẻ", key: "cardDetails.brand" },
  { label: "Tháng hết hạn", key: "cardDetails.expMonth" },
  { label: "Năm hết hạn", key: "cardDetails.expYear" },
];

interface transactionsTeacher extends transaction {
  full_name: string;
}

const Payout = () => {
  const [transaction, setTransaction] = useState<transactionsTeacher[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser = useSelector(
    (state: SliceState) => state.authSlice?.currentUser
  );

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const data = await teacherApi.getPaymentByPaymentTeacherId(
          currentUser?.user_id as string
        );
        if (data?.status === 200) {
          setLoading(false);
          setTransaction([...data?.data]);
        }
      } catch (error: any) {
        setLoading(false);
        alert(error?.message);
      }
    };
    getTransactions();
  }, []);

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
                data={transaction}
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
          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <table className="w-full min-w-max table-auto text-left overflow-auto">
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
                {transaction?.map((trans, index) => {
                  const isLast = index === transaction?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={trans?.transaction_id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {trans?.transaction_id}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatCurrency(trans?.amount ? trans?.amount : 0)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatTimeStamp(trans?.createdAt)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            className="italic"
                            value={trans?.status}
                            color={
                              trans?.status === "Thành công" ? "green" : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {trans?.cardDetails?.brand ? (
                            <>
                              <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                <Avatar
                                  src={
                                    trans?.cardDetails?.brand === "visa"
                                      ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                      : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                                  }
                                  size="sm"
                                  alt={trans?.cardDetails?.brand}
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
                                  {trans?.cardDetails?.brand}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {trans?.cardDetails?.expMonth} /{" "}
                                  {trans?.cardDetails?.expYear}
                                </Typography>
                              </div>
                            </>
                          ) : (
                            <>Miễn phí</>
                          )}
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {trans.title}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {trans.full_name}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
export default Payout;
