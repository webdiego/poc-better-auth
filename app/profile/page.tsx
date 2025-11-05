import { headers } from "next/headers";
import { auth } from "@/utils/auth";
import SignOut from "@/components/SignOut";

const session = await auth.api.getSession({
  headers: await headers(),
});

export default async function Profile() {
  console.log(session);
  const user = session?.user;
  return (
    <div className="h-screen">
      <div className="flex w-full justify-end items-end ">
        <SignOut />
      </div>
      <div className="h-full flex items-start justify-start">
        <div className="border bg-white p-4 rounded-lg text-sm">
          <div className="flex ">
            <p className=" font-medium mr-2">Name</p>
            <p>{user?.name}</p>
          </div>
          <div className="flex">
            <p className=" font-medium mr-2">Email</p>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
