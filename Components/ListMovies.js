import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ListMovies({ session }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const req = await fetch("/api/dynamodb?user=" + session.user.email);
      const res = await req.json();
      setData(res);
    };
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  const sorted_data = data.sort(function(a,b) { return b.epoch - a.epoch})

  return (
    <>
      <Table style={{ background: "white", marginTop: "2rem" }}>
        <TableHead>
          <TableRow>
            <TableCell>data</TableCell>
            <TableCell>type</TableCell>
            <TableCell>date_utc</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted_data.map((result, id) => (
            <TableRow key={id}>
              <TableCell>{result.data.S}</TableCell>
              <TableCell>{result.type.S}</TableCell>
              <TableCell>{result.date_utc.S}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}