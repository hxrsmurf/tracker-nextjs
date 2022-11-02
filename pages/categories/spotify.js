import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function spotify() {
    const { data: session } = useSession();
    const router = useRouter();
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [isLoading, setLoading] = useState(false);
    const [nowPlaying, setNowPlaying] = useState()

    useEffect(() => {
        setLoading(true);
        if (session.user) {
            const user_id = session.id

            fetch('/api/db/AuthDb?id=' + user_id)
                .then((res) => res.json())
                .then((data) => {
                    setAccessToken(data.accessToken.S);
                    setRefreshToken(data.refreshToken.S)
                    setLoading(false);
                });
        }
    }, [session]);

    useEffect(() => {
        if (accessToken && refreshToken) {
            var SpotifyWebApi = require('spotify-web-api-node');
            var spotifyApi = new SpotifyWebApi()
            spotifyApi.setAccessToken(accessToken)
            spotifyApi.setRefreshToken(refreshToken)

            spotifyApi.getMyCurrentPlayingTrack()
                .then(function (data) {
                    console.log('Now playing: ' + data.body.item.name);
                    setNowPlaying(data.body.item)
                }, function (err) {
                    console.log('Something went wrong!', err);
                });
        }
    }, [refreshToken])

    if (!session) {
        router.push("/");
        return <>Loading...</>;
    }
    if (!session.user) {
        return <>Loading...</>;
    }

    if (isLoading) return <p>Loading...</p>;
    if (!accessToken) return <p>No access token</p>;
    if (!nowPlaying) return <p>Nothing playing</p>

    return (
        <>
            <div className="content" style={{ marginTop: "2rem" }} direction="row">
                {!nowPlaying ? <>Nothing playing</> :
                    <>
                        <Grid justifyContent="center" alignItems="center">
                            <Grid item style={{ marginBottom: "2rem" }}><Image width={300} height={300} src={nowPlaying.album.images[1].url} /></Grid>
                            <Grid item>{nowPlaying.name} by {nowPlaying.artists.map((artist) => (<>{artist.name} </>))}</Grid>
                        </Grid>
                    </>}
            </div>
        </>
    );
}