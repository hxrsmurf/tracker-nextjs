import { useEffect, useState } from "react"
import Image from "next/image";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function RecentlyPlayed() {
    const [items, setItems] = useState()
    const [loadingRecentlyPlayed, setLoadingRecentlyPlayed] = useState(true)
    useEffect(() => {
        const get_recently_played = async () => {
            const req = await fetch('/api/spotify/recently-played?limit=' + 50)
            const res = await req.json()
            setItems(res.items)
            setLoadingRecentlyPlayed(false)
        }
        get_recently_played()
    }, [])

    if (!items) return <></>

    return (
        <>
            <Accordion style={{ marginTop: "2rem" }}>
                <AccordionSummary style={{ fontWeight: "bold" }}  expandIcon={<ExpandMoreIcon/>}>Recently Played</AccordionSummary>
                <AccordionDetails>
                    <Table>
                        <TableHead>
                            <TableCell>Album Cover</TableCell>
                            <TableCell>Song</TableCell>
                            <TableCell>Artists</TableCell>
                            <TableCell>Album</TableCell>
                        </TableHead>
                        {loadingRecentlyPlayed ? <>Loading recently played</> :
                            <>
                                <TableBody>
                                    {items.map((item, id) => (
                                        <TableRow key={id}>
                                            {/* Get the 300x300 */}
                                            <TableCell><Image width={150} height={150} src={item.track.album.images[1].url} /></TableCell>
                                            <TableCell>{item.track.name}</TableCell>
                                            <TableCell>{item.track.artists.length > 1 ? <>{item.track.artists.map(artist => artist.name + ' ')}</> : <>{item.track.artists[0].name}</>}</TableCell>
                                            <TableCell>{item.track.album.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </>}
                    </Table>
                </AccordionDetails>
            </Accordion>
        </>
    )
}