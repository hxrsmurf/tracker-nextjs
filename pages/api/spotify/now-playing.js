import { unstable_getServerSession } from "next-auth"
import { authOptions } from '../auth/[...nextauth]'

var SpotifyWebApi = require('spotify-web-api-node');

// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-the-users-currently-playing-track

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)
    const api_key = req.query.key
    const email = req.query.email

    if (!session || !api_key || !email) {
        if (api_key && email) {
            console.log('Granting access, has API key')
        } else if (session) {
            console.log('Has session, granting access')
        }
        else {
            return res.status(401).send({
                'message': 'Not authorized because no authentication.'
            })
        }
    }

    var access_token = null

    if (session) {
        access_token = session.tokens.access_token
    } else {
        // Two options for this:
        // 1 - query NextJS Auth's database for the email, then the primary key to get access_token
        // 2 - Store access_token in my other user table which also has categories.
        access_token = null
    }

    if (!access_token) {
        return res.status(400).send({
            message: 'Error getting now playing.'
        })
    }
    var spotifyApi = new SpotifyWebApi({
        accessToken: access_token
    })

    spotifyApi.getMyCurrentPlayingTrack({
    }).then(async function (data) {
        const playlist_uri = data.body.context.uri.split(':')[2]
        const playlist_type = data.body.context.type

        var playlist_information = null

        if (playlist_type == 'playlist') {
            playlist_information = await query_spotify(playlist_uri, playlist_type, access_token)
        }

        return res.send(
            {
                'items': data.body.item,
                'playlist': playlist_information
            }
        )
    }, function (err) {
        console.log('Something went wrong!', err);
    });
}

const query_spotify = async (uri, type, access_token) => {
    var spotifyApi = new SpotifyWebApi({ accessToken: access_token })
    var playlist_name = null
    var playlist_cover = null

    if (type === 'playlist') {
        const playlist = await spotifyApi.getPlaylist(uri)
        playlist_name = playlist.body.name
        playlist_cover = playlist.body.images[0].url
    }

    return ({
        name: playlist_name,
        image: playlist_cover
    })
}