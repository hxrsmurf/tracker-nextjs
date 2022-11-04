import { Accordion, AccordionDetails, AccordionSummary, Button, Grid } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function SpotifySettings() {
 const { data: session } = useSession();
 const [sharing, setSharing] = useState()
 const [shareId, setShareId] = useState(null)

 const handleShareClick = () => {
    setSharing(sharing ? false: true)

    const submitData = async () => {
        const query = await fetch('http://localhost:3000/api/db/Spotify', {method: 'PUT', body: Boolean(sharing)})
        const response = await query.json()
        setShareId(response)
    }
    console.log(shareId)
    submitData()
 }

  return (
    <Accordion>
        <AccordionSummary>NOW PLAYING</AccordionSummary>
        <AccordionDetails>
            <Grid>
            {!shareId ? <></> : <><Grid item>{shareId.share_id}</Grid></>}
            <Grid item><Button variant='contained' onClick={()=> handleShareClick()}>{sharing ? <>Disable</> : <>Enable</>} Public Sharing</Button></Grid>
            </Grid>
        </AccordionDetails>
    </Accordion>
  )
}
