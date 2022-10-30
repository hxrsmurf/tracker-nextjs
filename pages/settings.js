import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Settings from "../Components/Settings";

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
      <div>
        Settings for {session.user.name} | {session.user.email}
      </div>
      <Settings />
    </>
  );
}