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
        <p>
          Settings for {session.user.name} | {session.user.email}
        </p>
        <p>You'll have to refresh the page to see new categories.</p>
      </div>
      <Settings />
    </>
  );
}