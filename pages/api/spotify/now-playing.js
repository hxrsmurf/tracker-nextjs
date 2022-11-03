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
        } else if (session){
            console.log('Has session, granting access')
        }
        else {
            return res.status(401).send({
                'message': 'Not authorized because no authentication.'
            })
        }
    }

    var access_token = null

    if (session){
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
    }).then(function (data) {
        console.log(data)
        return res.send({ 'items': data.body.item })
    }, function (err) {
        console.log('Something went wrong!', err);
    });
}