import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ListCategory({ session, type }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const router = useRouter()

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const req = await fetch("/api/db/DBUserProfile?ref=list&user=" + session.user.email);
      const res = await req.json();
      setData(res);
    };
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;


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
