import Header from "@/components/Header";
import Users from "@/components/Users";
import { getUsers } from "@/lib/data-services";
import { Suspense } from "react";

async function Home() {
  const usersData = await getUsers();

  return (
    <div className=" flex flex-col justify-center p-14">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Users usersData={usersData} />
      </Suspense>
    </div>
  );
}

export default Home;
