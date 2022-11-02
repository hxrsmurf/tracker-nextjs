import { useSession } from "next-auth/react"
import NowPlaying from "../../Components/Spotify/NowPlaying"
import RecentlyPlayed from '../../Components/Spotify/RecentlyPlayed'

export default function Index() {
    const { data: session } = useSession()

    if (!session) return <>Loading session...</>
    if (!session.user) return <>Loading user...</>

    return (
        <>
            <div className="content">
                {session.user.email}
                <NowPlaying/>
                <RecentlyPlayed/>
            </div>
        </>
    )
}