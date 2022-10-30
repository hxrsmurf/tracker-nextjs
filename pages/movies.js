import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Form from "../Components/Form";
import ListMovies from "../Components/ListMovies";

export default function movies(props) {
  const { data: session } = useSession();
  const [databaseResults, setdatabaseResults] = useState();
  if (!session) useRouter().push("/");

  if (!session.user) return <>Loading...</>;

  return (
    <>
      <div>
        <Form type="movie" user={session.user.email} />
      </div>

      <div>Movies</div>
      <ListMovies session={session} />
    </>
  );
}