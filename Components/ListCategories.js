import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function ListCategories({ session, type }) {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch(
        "/api/db/DBUserProfile?user=" + session.user.email
      );
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
            <TableCell>data</TableCell>
            <TableCell>type</TableCell>
            <TableCell>date_utc</TableCell>
            <TableCell>time_utc</TableCell>
            <TableCell>epoch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter(function (result) {
              return result.type.S == type;
            })
            .map((result, id) => (
              <TableRow key={id}>
                <TableCell>{result.data.S}</TableCell>
                <TableCell>{result.type.S}</TableCell>
                <TableCell>{result.date_utc.S}</TableCell>
                <TableCell>{result.time_utc.S}</TableCell>
                <TableCell>{result.epoch.S}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
