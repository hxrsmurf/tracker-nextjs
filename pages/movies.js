import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "../Components/Form";

export default function movies() {
  const { data: session } = useSession();
  if (!session) useRouter().push("/");

  if (!session.user) return <>Loading...</>

  return (
    <>
      <div>
        <Form type="movie" user={session.user.email}/>
      </div>

      <div>Movies</div>
    </>
  );
}