import { unstable_getServerSession } from "next-auth"
import { authOptions } from '../auth/[...nextauth]'

var SpotifyWebApi = require('spotify-web-api-node');

// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-the-users-currently-playing-track

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).send({
            'message': 'Not authorized.'
        })
    }

    var spotifyApi = new SpotifyWebApi({
        accessToken: session.tokens.access_token
    })

    spotifyApi.getMyCurrentPlayingTrack({
    }).then(function (data) {
        return res.send({'items': data.body.item})
    }, function (err) {
        console.log('Something went wrong!', err);
    });
}