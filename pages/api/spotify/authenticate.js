import { unstable_getServerSession } from "next-auth"
import { authOptions } from '../auth/[...nextauth]'

var SpotifyWebApi = require('spotify-web-api-node');

// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-the-users-currently-playing-track

export default async function handler(req, res) {
    const api_key = req.query.key
    const email = req.query.email

    var session = null

    if (req.method == 'POST') {
        session = JSON.parse(req.body)
    } else {
        session = await unstable_getServerSession(req, res, authOptions)
    }

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

    if (!spotifyApi) {
        res.status(401).send({
            message: 'Not able to authenticate.'
        })
    }

    res.status(200).send({
        access_token: access_token,
        spotifyApi: spotifyApi
    })
}