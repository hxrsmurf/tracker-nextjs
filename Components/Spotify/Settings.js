import { Accordion, AccordionDetails, AccordionSummary, Button, Grid } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function SpotifySettings() {
  const { data: session } = useSession();
  const [sharing, setSharing] = useState()
  const [shareId, setShareId] = useState()
  const [hideButton, setHideButton] = useState(true) // Helps with preventing false loads. Not sure how to fix that as sometimes it doesn't refresh

  // Get current setting
  useEffect(() => {
    {
      const query = async () => {
        const req = await fetch('http://localhost:3000/api/db/Spotify?now_playing_public')
        const res = await req.json()
        setShareId(res.setting.S)
      }
      query()
      setHideButton(false)
    }
  }, [hideButton])

  const handleShareClick = () => {
    setSharing(shareId === 'disabled' ? 'enabled' : 'disabled')
    setHideButton(true)

    const submitData = async () => {
      const query = await fetch('http://localhost:3000/api/db/Spotify', { method: 'PUT', body: sharing })
      const response = await query.json()
      setShareId(response.share_id)
    }
    submitData()
    setHideButton(true)
  }

  return (
    <Accordion>
      <AccordionSummary>NOW PLAYING</AccordionSummary>
      <AccordionDetails>
        <Grid>
          <Grid item>{shareId === 'disabled' ? <></> : <>{shareId}</>}</Grid>
          <Grid item>{hideButton ? <></> :
            <>
              <Button variant='contained' onClick={() => handleShareClick()}>{shareId === 'disabled' ? <>Enable</> : <>Disable</>} Public Sharing</Button>
            </>
          }
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}