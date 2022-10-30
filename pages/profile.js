import { Table, TableBody, TableCell, TableHead } from "@mui/material";
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
      <div>
        Profile for {session.user.name} | {session.user.email}
      </div>
      <div>
        <Table style={{ background: "white", marginTop: "2rem" }}>
          <TableHead>
            <TableCell>Catagory</TableCell>
          </TableHead>
          <TableBody>
            <TableCell>Example Catagory</TableCell>
          </TableBody>
        </Table>
      </div>
    </>
  );
}