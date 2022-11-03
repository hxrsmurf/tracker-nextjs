import { unstable_getServerSession } from "next-auth"
import { authOptions } from '../auth/[...nextauth]'
import { GetPlaylistInformation } from "../../libs/spotify/GetPlaylist";

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

    /// This does not work if not a playlist. I should figure out how to create another handler function to get the context
    // Then use that context to get the information

    spotifyApi.getMyCurrentPlayingTrack({
    }).then(function (data) {
        const playlist_uri = data.body.context.uri.split(':')[2]

        return ({
            'items': data.body.item,
            'playlist_id': playlist_uri
        })

    }, function (err) {
        console.log('Cannot query currentl playing track!', err);
    }).then(function (data) {

        const playlist_id = data.playlist_id

        spotifyApi.getPlaylist(playlist_id).then(function (playlist_info) {
            const playlist = {
                name: playlist_info.body.name,
                image: playlist_info.body.images[0].url,
                description: playlist_info.body.description
            }

            return res.send({
                playlist: playlist,
                items: data.items
            })

        })
    })
}