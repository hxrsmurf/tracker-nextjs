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
import { useRouter } from "next/router";
import SpotifySettings from "./Spotify/Settings";

export default function Accordian({ type }) {
  const { data: session } = useSession();
  const [data, setData] = useState();
  const [showFormModal, setShowFormModal] = useState(false);
  const [countMobile, setCountMobile] = useState(null);
  const [countApiKey, setCountApiKey] = useState(null)
  const [reload, setReload] = useState(false)
  const router = useRouter()

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
  }, [showFormModal, reload]);

  useEffect(() => {
    // Counts mobile number. If more than 1, then do not allow add another.
    if (data) {
      let counter = 0;
      let api_key_counter = 0;
      if (type === "Mobile Number" || type === "key") {
        for (let d of data) {
          if (d.type.S === "Mobile Number") {
            console.log(d.type.S);
            counter++;
          }

          if (d.type.S === "key") {
            api_key_counter++
          }
        }
      }
      setCountApiKey(api_key_counter)
      setCountMobile(counter);
    }
  }, [data]);

  if (!data) {
    return <>Loading data from Accordian...</>;
    setLoading(false);
  }

  if (!session) return <>Loading...</>;

  if (type === 'Now Playing') {
    return (
      <div style={{marginTop: "2rem"}}>
        <SpotifySettings/>
      </div>
    )
  }

  const handleShowFormModal = () => {
    setShowFormModal(true);
  };

  const handleHideFormModal = () => {
    setShowFormModal(false);
  };

  const handleAPIKey = () => {
    const submitData = async () => {
      const req = await fetch('/api/generateKey?user=' + session.user.email)
      const resp = await req.json()
      console.log(resp)
    }
    submitData()
    setReload(true)
    router.reload()
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <AddSetting
        show={showFormModal}
        handleHideFormModal={handleHideFormModal}
        type={type}
      />

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <div style={{ textTransform: "uppercase" }}>
            {type}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {(countMobile >= 1 && type == "Mobile Number") || (countApiKey >= 5 && type === "key") ? (
            <></>
          ) : (
            <>
              <Fab
                size="small"
                color="primary"
                style={{ marginLeft: "1rem" }}
                onClick={type == "key" ? handleAPIKey : handleShowFormModal}
                variant="extended"
              >
                <AddIcon sx={{ mr: 1 }} />
                <div style={{ marginRight: "1rem" }}>Add</div>
              </Fab>
            </>
          )}

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