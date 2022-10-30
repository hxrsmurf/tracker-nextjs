import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddCategory from "./Forms/AddCategory";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function Settings() {
  const { data: session } = useSession();
  if (!session) return <>Loading...</>;

  const [data, setData] = useState();
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch(
        "/api/db/DBUserProfile?ref=list&user=" + session.user.email
      );
      const res = await req.json();
      setData(res);
    };
    fetchData();
  }, [showFormModal]);

  if (!data) return <>Loading...</>;

  // Modal

  const handleShowFormModal = () => {
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

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <div>Categories</div>
          </AccordionSummary>
          <AccordionDetails>
            <Fab
              size="small"
              color="primary"
              style={{ marginLeft: "1rem" }}
              onClick={handleShowFormModal}
              variant="extended"
            >
              <AddIcon sx={{ mr: 1 }} />
              <div style={{ marginRight: "1rem" }}>Add</div>
            </Fab>
            <List>
              {data.map((d, id) => (
                <>
                  <ListItem key={id}>
                    <ListItemText>{d.category.S}</ListItemText>
                  </ListItem>
                  <Divider></Divider>
                </>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}