import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";

export default function CategoryListing() {
  const { data: session } = useSession();
  const [data, setData] = useState();
  const router = useRouter();

  if (!session) return <>Loading...</>;
  if (!session.user) return <>Loading...</>;

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch(
        "/api/db/DBUserProfile?ref=list&user=" + session.user.email
      );
      const res = await req.json();
      setData(res);
    };
    fetchData();
  }, []);

  if (!data) return <>Loading...</>;

  const handleCategoryClick = (event) => {
    router.push("/categories/" + event.target.textContent);
  };

  return (
    <>
        {data.map((data, id) => (
          <Grid item key={id}>
            <Button
              variant="contained"
              style={{ marginRight: "1rem" }}
              onClick={(event) => handleCategoryClick(event)}
            >
              {data.category.S}
            </Button>
          </Grid>
        ))}
    </>
  );
}