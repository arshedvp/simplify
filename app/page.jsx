import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { Dashboard } from "../components/Dashboard";
import { redirect } from 'next/navigation';


export default async function Home() {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect('/signin');
  // }

  // This is where you'd fetch the user's data from your backend
  const userData = {
    name: "John Marius",
    phoneNumber: "0123456789",
    premiumAmount: 29.9,
    callDataUsage: 45.6,
    minutes: 200,
    recentBills: [
      { date: "13 Feb - 13 Mar 2023", amount: 149 },
      { date: "13 Jan - 13 Feb 2020", amount: 149 },
      { date: "13 Dec - 13 Jan 2020", amount: 149 },
    ]
  };

  return <Dashboard userData={userData} />;
}