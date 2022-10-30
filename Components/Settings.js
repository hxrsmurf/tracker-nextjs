import { Button, Fab } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function Settings() {
  const { data: session } = useSession();
  if (!session) return <>Loading...</>;

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch(
        "/api/db/DBUserProfile?user=" + session.user.email
      );
      const res = await req.json();
      setData(res);
      console.log(res);
    };
    fetchData();
  }, []);

  if (!data) return <>Loading...</>;

  return (
    <>
      <div style={{ marginTop: "2rem" }}>
        <div>
          Categories
          <Fab size="small" color="primary" style={{ marginLeft: "1rem" }}>
            <AddIcon />
          </Fab>
        </div>
        <ul>
          {data.map((d, id) => {
            <li>{d.catagories.S}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
