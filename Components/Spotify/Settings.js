import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function SpotifySettings() {
 const { data: session } = useSession();
 const [sharing, setSharing] = useState()

 const handleShareClick = () => {
    setSharing(sharing ? false: true)
 }

  return (
    <Accordion>
        <AccordionSummary>NOW PLAYING</AccordionSummary>
        <AccordionDetails>
            <Button variant='contained' onClick={()=> handleShareClick()}>{sharing ? <>Disable</> : <>Enable</>} Public Sharing</Button>
        </AccordionDetails>
    </Accordion>
  )
}
