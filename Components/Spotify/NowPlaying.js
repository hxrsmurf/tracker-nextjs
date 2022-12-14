import { useEffect, useState } from "react"
import Image from "next/image";

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Grid from '@mui/material/Grid'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function NowPlaying() {
    const [items, setItems] = useState()
    const [playlist, setPlaylist] = useState()
    const [loading, setLoading] = useState(true)
    const [accordionOpen, setAccordionOpen] = useState(true)

    useEffect(() => {
        const get_recently_played = async () => {
            const req = await fetch('/api/spotify/now-playing')
            const res = await req.json()
            setPlaylist(res.playlist)
            setItems(res.items)
            setLoading(false)
        }
        get_recently_played()
    }, [])

    if (!items) return <></>

    const handleCloseAccordion = () => {
        setAccordionOpen(accordionOpen ? false : true)
    }

    return (
        <div style={{ marginTop: "2rem" }}>
            <Accordion expanded={accordionOpen} onClick={() => handleCloseAccordion()}>
                <AccordionSummary style={{ fontWeight: "bold" }} expandIcon={<ExpandMoreIcon />}>Now Playing</AccordionSummary>
                <AccordionDetails>
                    <Grid>
                        {!playlist ? <></> :
                            <>
                                <Grid container spacing={2}>
                                    <Grid item><Image width={250} height={250} src={playlist.image} /></Grid>
                                    <Grid item style={{ marginTop: "3rem", fontSize: "2rem", fontWeight: "bold" }}>{playlist.name}</Grid>
                                </Grid>
                                <Grid container style={{ marginTop: "2rem" }} spacing={2}></Grid>
                            </>
                        }
                        <Grid container style={playlist ? { marginTop: "2rem" } : { marginTop: "0rem" }} spacing={2}>
                            <Grid item>
                                <Image width={300} height={300} src={items.album.images[1].url} />
                            </Grid>

                            <Grid item style={{ marginTop: "3rem", fontSize: "2rem", fontWeight: "bold" }}>
                                {items.name} by {items.artists.length > 1 ? <>{items.artists.map(artist => artist.name + ' ')}</> : <>{items.artists[0].name}</>}
                            </Grid>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}