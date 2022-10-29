import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function youtube() {
  const { data: session } = useSession();
  if (!session) useRouter().push("/");
  return (
    <>
      <div style={{ marginTop: "2rem" }}>youtube</div>
    </>
  );
}