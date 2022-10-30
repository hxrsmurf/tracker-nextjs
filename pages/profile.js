import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function profile() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/");
    return <>Loading...</>;
  }
  if (!session.user) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>Profile page for {session.user.name}</div>
    </>
  );
}