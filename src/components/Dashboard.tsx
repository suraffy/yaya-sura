import { useQuery } from "react-query";
import axios from "axios";

import Header from "./common/Header";
import TanstackTable from "./common/TanstackTable";

const columns = [
  { accessorKey: "transactionID", header: "Transaction ID" },
  { accessorKey: "sender", header: "Sender" },
  { accessorKey: "receiver", header: "Receiver" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "currency", header: "Currency" },
  { accessorKey: "cause", header: "Cause" },
  { accessorKey: "createdAt", header: "Created At" },
];

const Dashboard = () => {
  const apiEndpoint = "https://sura-yaya-api.onrender.com/transactions";
  const { data, isLoading } = useQuery("suraU", () => axios.get(apiEndpoint));

  const transactions = data?.data.data.map((t) => ({
    transactionID: t.id,
    sender: t.sender.name,
    receiver: t.receiver.name,
    amount: t.amount,
    currency: t.currency,
    cause: t.cause || "-",
    createdAt: t.created_at_time,
  }));

  console.log(transactions);

  return (
    <>
      <Header />
      <div className="containerr px-5 mt-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <TanstackTable data={transactions} columns={columns} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
