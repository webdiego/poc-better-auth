import { Button } from "@/components/ui/button";
import Link from "next/link";
import Technologies from "@/components/Technologies";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Index() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">
          Build faster
        </h1>
        <p className="max-w-md text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
          doloremque mollitia fugiat omnis!
        </p>
        <Technologies />
        <div className="flex  items-center justify-center gap-2 mt-10">
          <Button size={"sm"}>
            <Link href="/sign-up">Sign up</Link>
          </Button>
          <Button size={"sm"} variant="outline">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
