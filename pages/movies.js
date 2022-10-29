import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function movies() {
  const { data: session } = useSession();
  if (!session) useRouter().push("/");
  return <div>movies</div>;
}