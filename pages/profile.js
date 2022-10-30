import { useSession } from "next-auth/react";

export default function profile() {
  const { data: session } = useSession();
  if (!session) {
    console.log("No session");
    return <>Loading...</>;
  } else if (!session.user) {
    console.log("no session user");
    return <>Loading...</>;
  }

  return (
    <>
      <div style={{ marginTop: "2rem" }}>Profile Page for user.</div>
    </>
  );
}