import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Settings from "../Components/Settings";

export default function SettingsPage() {
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
      <div className="content">
        <div>
          <div>
            Settings for {session.user.name} | {session.user.email}
          </div>
          <div>You&apos;ll have to refresh the page to see new categories.</div>
        </div>
        <Settings />
      </div>
    </>
  );
}