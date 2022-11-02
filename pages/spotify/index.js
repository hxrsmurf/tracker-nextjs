import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import NowPlaying from "../../Components/Spotify/NowPlaying"
import RecentlyPlayed from '../../Components/Spotify/RecentlyPlayed'

export default function Index() {
    const { data: session } = useSession()
    const router = useRouter()

    if (!session) {
        router.push("/");
        return <></>
      }
    if (!session.user) return <></>

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