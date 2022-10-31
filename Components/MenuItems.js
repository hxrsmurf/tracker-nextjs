import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function MenuItems({ session, type }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (session.user) {
      fetch("/api/db/DBUserProfile?ref=list&user=" + session.user.email)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [session]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  const handleCategoryClick = (event) => {
    router.push("/categories/" + event.target.textContent);
  };

  return (
    <>
      {data.map((data, id) => (
        <Grid item key={id} style={{ marginLeft: "1rem" }}>
          <Button
            variant="contained"
            onClick={(event) => handleCategoryClick(event)}
          >
            {data.category.S}
          </Button>
        </Grid>
      ))}
    </>
  );
}