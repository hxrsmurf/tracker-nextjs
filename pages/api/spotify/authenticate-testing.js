import { unstable_getServerSession } from "next-auth"
import { authOptions } from '../auth/[...nextauth]'

var SpotifyWebApi = require('spotify-web-api-node');

/*
    I'm not sure if this separate function "saves" me the effort with handling authentication. I'll still have check the session or email/API key.
    The SpotifyWebAPI still needs an access token; I'm not sure how to Constructors work, yet.
    Therefore, I think centralizing the spotify calls in one big file with multiple functions is the solution.
*/

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)
    const api_key = req.query.key
    const email = req.query.email
    var authenticate = null

    if (api_key && email) {
        const query_authenticate = await fetch('http://localhost:3000/api/spotify/authenticate?key=' + api_key + "&email=" + email)
        authenticate = await query_authenticate
    } else {
        const query_authenticate = await fetch('http://localhost:3000/api/spotify/authenticate', { method: 'POST', body: JSON.stringify(session) })
        authenticate = await query_authenticate
    }

    if (authenticate.status == 401) {
        return res.status(401).send({
            message: 'Unauthorized'
        })
    }
    return res.status(200).send({
        message: 'Hello'
    })
}