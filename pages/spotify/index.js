import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export default function index() {
    const { data: session } = useSession()
    const [helloData, setHelloData] = useState()

    useEffect(() => {
        const hello = async () => {
            const req = await fetch('/api/hello')
            const res = await req.json()
            setHelloData(res)
        }
        hello()

    }, [])

    if (!session) return <>Loading session...</>
    if (!session.user) return <>Loading user...</>
    if (!helloData) return <>Loading Hello Data...</>

    return (
        <>
            <div className="content">
                {session.user.email} {helloData.message}
                <Accordion style={{ marginTop: "2rem" }}>
                    <AccordionSummary>Recently Played</AccordionSummary>
                    <AccordionDetails>
                        Hello
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    )
}