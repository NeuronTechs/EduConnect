import assets from "@/assets";
import { IStudent } from "@/types/type";
import { ArrowsDownUp } from "@phosphor-icons/react";

type props = {
  listStudent: IStudent[];
};

const Table = (props: props) => {
  const TABLE_HEAD = ["Name", "Job", "Status", "Employed", ""];

  return (
    <div className="p-10 py-0 bg-white ">
      <table className="w-full min-w-max table-auto text-left border-x-2 bg-gray-200">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer "
              >
                {index !== TABLE_HEAD.length - 1 && (
                  <div className="flex items-center space-x-1">
                    <p> {head}</p>
                    <ArrowsDownUp className="text-gray-500" size={14} />{" "}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {props.listStudent.map(
            ({ id, username, major, createdAt, email }, index) => {
              const isLast = index === props.listStudent.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="avatar-account flex items-center ">
                      <img
                        src={assets.images.avatar1}
                        alt="avatar"
                        className="rounded-full h-[40px] w-[40px] mr-4"
                      />
                      <div>
                        <p className="text-sm font-bold">{username}</p>
                        <p className="text-xs text-gray-500">{email}</p>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <p className="text-xs text-gray-500 font-bold">{major}</p>
                    <p className="text-xs text-gray-500 ">developer</p>
                  </td>
                  <td className={classes}>
                    {status === "ONLINE" ? (
                      <div className="w-14 p-1 text-xs text-white h-6 bg-gradient-to-br font-bold rounded-md from-light-green-500 to-green-500 text-center">
                        Online
                      </div>
                    ) : (
                      <div className="w-14 p-1 text-xs text-white h-6 bg-gradient-to-br font-bold rounded-md from-gray-400 to-gray-800 text-center">
                        Offline
                      </div>
                    )}
                  </td>
                  <td className={classes}>
                    <p className="text-sm text-gray-400 font-semibold">
                      {createdAt.toISOString()}
                    </p>
                  </td>
                  <td className={classes}>
                    <p className="text-xs text-gray-500">Edit</p>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      {/* create text box for search bar */}
    </div>
  );
};

export default Table;
