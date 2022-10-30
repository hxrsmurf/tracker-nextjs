import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

//  "/api/db/DBUserProfile?ref=list&user=" + session.user.email

export default function MenuItems({ session, type }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

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