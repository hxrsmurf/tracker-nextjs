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

  return (
    <>
      <Table style={{ background: "white", marginTop: "2rem" }}>
        <TableHead>
          <TableRow>
            <TableCell>email</TableCell>
            <TableCell>id</TableCell>
            <TableCell>data</TableCell>
            <TableCell>type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((result, id) => (
            <TableRow key={id}>
              <TableCell>{result.email.S}</TableCell>
              <TableCell>{result.id.S}</TableCell>
              <TableCell>{result.data.S}</TableCell>
              <TableCell>{result.type.S}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}