import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "../Components/Form";

export default function movies() {
  const { data: session } = useSession();
  if (!session) useRouter().push("/");
  return (
    <>
      <div>
        <Form type="movie"/>
      </div>

      <div>Movies</div>
    </>
  );
}