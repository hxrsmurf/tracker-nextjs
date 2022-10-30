import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";

export default function CatagoryListing() {
  const { data: session } = useSession();
  const [data, setData] = useState();
  const router = useRouter();

  if (!session) return <>Loading...</>;
  if (!session.user) return <>Loading...</>;

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

  const handleCatagoryClick = (event) => {
    router.push("/" + event.target.textContent);
  };

  return (
    <>
        {data.map((data, id) => (
          <Grid item key={id}>
            <Button
              variant="contained"
              style={{ marginRight: "1rem" }}
              onClick={(event) => handleCatagoryClick(event)}
            >
              {data.catagory.S}
            </Button>
          </Grid>
        ))}
    </>
  );
}