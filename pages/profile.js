import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Profile from "../Components/Profile";

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
        Profile for {session.user.name} | {session.user.email}
      </div>
      <Profile />
    </>
  );
}