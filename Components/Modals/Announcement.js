import { Box, Button, Card, CardActions, CardContent, Modal } from "@mui/material"
import { useEffect, useState } from "react"

import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
import CheckIcon from '@mui/icons-material/Check';

export default function Announcement() {
    const [announcementAcknowledged, sethandleAcknowledged] = useState(true)
    const announcement_text = 'This website is in alpha. Features will change often. Data may be lost.'

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        const query = async () => {
            const req = await fetch('http://localhost:3000/api/announcement')
            const result = await req.json()
            sethandleAcknowledged(result.acknowledged)
        }
        query()
    }, [])

    const handleAcknowledge = (e) => {
        sethandleAcknowledged(announcementAcknowledged ? false : true)

        const query = async () => {
            const req = await fetch('http://localhost:3000/api/announcement?acknowledged=' + announcementAcknowledged, { method: 'PUT' })
            const res = await req.json()
        }

        if (e.target.textContent == 'Dismiss') {
            console.log('Dismissed')
        } else {
            console.log('Acknowledged')
            query()
        }
    }

    if (!announcementAcknowledged) {
        return (
            <div>
                <Modal open={announcementAcknowledged ? false : true}>
                        <Box sx={style}>
                            <Card>
                                <CardContent>
                                    {announcement_text}
                                </CardContent>

                                <CardActions>
                                    <Button variant="contained" startIcon={<CheckIcon />} color='success' onClick={(e) => handleAcknowledge(e)}>Acknowledge</Button>
                                    <Button variant="contained" startIcon={<NotificationsPausedIcon />} color='secondary' onClick={(e) => handleAcknowledge(e)}>Dismiss</Button>
                                </CardActions>
                            </Card>
                        </Box>
                </Modal>
            </div>
        )
    }
}