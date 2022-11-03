import { unstable_getServerSession } from "next-auth"
import { useState } from "react";
import { authOptions } from '../../api/auth/[...nextauth]'

var SpotifyWebApi = require('spotify-web-api-node');

// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-the-users-currently-playing-track

export async function GetPlaylistInformation(id, spotifyApi) {
    const [result, setResult] = useState(null)

    const query = () => {
    spotifyApi.getPlaylist(id).then(function (data) {
        const result = {
                description: data.body.description,
                name: data.body.name,
                image: data.body.images[0].url
            }
            setResult(result)
        }
    )}

    query()

    return result
}

