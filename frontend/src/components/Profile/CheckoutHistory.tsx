import {
  Card,
  Typography,
  CardBody,
  Chip,
  Avatar,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as authApi from "../../api/authApi/authApi";
import { useSelector } from "react-redux";
import { SliceState } from "@/types/type";
import { formatCurrency, formatTimeStamp } from "@/utils/const";

const TABLE_HEAD = ["ID", "Số tiền", "Ngày", "Trạng thái", "Tài khoản"];
export interface transaction {
  student_id: string;
  transaction_id: string;
  course_id: string;
  title: string;
  amount: number;
  status: string;
  createdAt: string;
  cardDetails?: cardDetails;
}
interface cardDetails {
  brand?: string;
  expMonth?: number;
  expYear?: number;
  last4?: string;
}

const CheckoutHistory = () => {
  const [transaction, setTransaction] = useState<transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser = useSelector(
    (state: SliceState) => state.authSlice?.currentUser
  );

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const data = await authApi.getTransactionByStudent(
          currentUser?.username as string
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
    <div className="h-full">
      <div className="text-center border-b-2 border-gray-500">
        <h1 className="font-bold text-black mb-3">Lịch sử thanh toán</h1>
      </div>
      <Card className="h-[500px] w-full">
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

export default CheckoutHistory;
