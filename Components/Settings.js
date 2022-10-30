import { Box, Button, Fab, Modal, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddCategory from "./Forms/AddCategory";

export default function Settings() {
  const { data: session } = useSession();
  if (!session) return <>Loading...</>;

  const [data, setData] = useState();
  const [showFormModal, setShowFormModal] = useState(false);

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

  // Modal

  const handleShowFormModal = () => {
    console.log("Show form");
    setShowFormModal(true);
  };

  const handleHideFormModal = () => {
    setShowFormModal(false);
  };

  return (
    <>
      <div style={{ marginTop: "2rem" }}>

        <AddCategory
          show={showFormModal}
          handleHideFormModal={handleHideFormModal}
        />

        <div>
          Categories
          <Fab
            size="small"
            color="primary"
            style={{ marginLeft: "1rem" }}
            onClick={handleShowFormModal}
          >
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
