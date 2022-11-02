import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

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
        <div>{session.user.email} {helloData.message}</div>
    )
}