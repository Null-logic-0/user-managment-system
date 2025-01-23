import Header from "@/components/Header";
import Users from "@/components/Users";
import { getUsers } from "@/lib/data-services";

async function Home() {
  const usersData = await getUsers();

  return (
    <div className=" flex flex-col justify-center p-14">
      <Header />
      <Users usersData={usersData} />
    </div>
  );
}

export default Home;
