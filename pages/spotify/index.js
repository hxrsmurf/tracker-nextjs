import { useSession } from "next-auth/react"
import RecentlyPlayed from '../../Components/Spotify/RecentlyPlayed'

export default function index() {
    const { data: session } = useSession()

    if (!session) return <>Loading session...</>
    if (!session.user) return <>Loading user...</>

    return (
        <>
            <div className="content">
                {session.user.email}
                <RecentlyPlayed/>
            </div>
        </>
    )
}