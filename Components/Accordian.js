import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AddSetting from "./Forms/AddSetting";

export default function Accordian({ type }) {
  const { data: session } = useSession();
  const [data, setData] = useState();
  const [showFormModal, setShowFormModal] = useState(false);

  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading && type === "Mobile Number") {
    setUrl(type);
    setLoading(false);
  }

  if (!data) {
    return <>Loading data from Accordian...</>;
    setLoading(false);
  }

  if (!session) return <>Loading...</>;

  const handleShowFormModal = () => {
    setShowFormModal(true);
  };

  const handleHideFormModal = () => {
    setShowFormModal(false);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <AddSetting
        show={showFormModal}
        handleHideFormModal={handleHideFormModal}
        type={type}
      />

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <div>{type}</div>
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
            {!data ? (
              <></>
            ) : (
              <>
                {data.map((d, id) => (
                  <>
                    {d.type.S == type ? (
                      <>
                        <ListItem key={id}>
                          <ListItemText>{d.category.S}</ListItemText>
                        </ListItem>
                        <Divider></Divider>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </>
            )}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}