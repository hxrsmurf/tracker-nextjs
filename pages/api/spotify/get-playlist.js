import { unstable_getServerSession } from "next-auth"
import { authOptions } from '../auth/[...nextauth]'
import { GetPlaylistInformation } from "../../libs/spotify/GetPlaylist";

var SpotifyWebApi = require('spotify-web-api-node');

// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-the-users-currently-playing-track

export default async function handler(req, res) {
    /// This does not work if not a playlist. I should figure out how to create another handler function to get the context
    // Then use that context to get the information
    // We could assume an API key or something.
    // I'm thinking a central authentication hook and then go from there.

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