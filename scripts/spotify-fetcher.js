'use strict';
const _ = require('lodash');
const colors = require('colors/safe');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi();

console.log(colors.green('Fetching spotify data'));
const artists = [
    '7Ln80lUS6He07XvHI8qqHH', // Arctic Monkeys
    '3WrFJ7ztbogyGnTHbHJFl2', // Beatles
    '03r4iKL2g2442PT9n2UKsx', // Beastie Boys
    '5M52tdBnJaKSvOpJGz8mfZ', // Black Sabbath
    '7jy3rLJdDQY21OgRLCZ9sD', // Foo Fighters
    '5SMVzTJyKFJ7TUb46DglcH', // Funkadelic
    '3AA28KZvwAUcZuOKwyblJQ', // Gorillaz
    '6J7biCazzYhU3gM9j1wfid', // Jamiroquai
    '02NfyD6AlLA12crYzw5YcR', // Jane's Addiction
    '36QJpDe2go2KgaRleHCDTp', // Led Zeppelin
    '2ye2Wgw4gimLv2eAKyk1NB', // Metallica
    '0X380XXQSNBYuleKzav5UO', // Nine Inch Nails
    '6olE6TJLqED3rqDCT0FyPh', // Nirvana
    '1w5Kfo2jwwIPruYS2UWh56', // Pearl Jam
    '4pejUc4iciQfgdX6OKulQn', // Queens of the stone age
    '4Z8W4fKeB5YxbusRsdQVPb', // David Bowie
    '0L8ExT028jH3ddEcZwqJJ5', // Red hot chili peppers
    '22bE4uQ6baNwSHPVcDxLCe', // Rolling Stones
    '40Yq4vzPs9VNUrIBG5Jr2i', // Smashing pumpkins
    '5UqTO8smerMvxHYA5xsXb6' // Sonic Youth
];
// Bands
spotifyApi.getArtists(artists)
    .then(function(data) {
        console.log(colors.green('----> Fetched BAND data'));

        if (data.body) {
            const artistsArray = data.body.artists;

            //Writing bands file
            artistsArray.forEach(artist => {
                const artistName = artist.name;
                const fileName = `database/seeds/bands/${_.snakeCase(artistName)}_band.json`;

                fs.writeFileAsync(fileName, JSON.stringify({
                    docType: "BAND",
                    genres: artist.genres.join(', '),
                    name: artistName,
                    url: artist.images[0].url,
                    popularity: artist.popularity
                }), "utf8");

                // Albums
                spotifyApi.getArtistAlbums(artist.id)
                    .then(data => {
                        console.log(colors.green('----> Reading Artists albums data'));
                        if (data.body) {
                            const albumsArray = [];

                            data.body.items.forEach(album => {
                                if (album.album_type === 'album') {
                                    albumsArray.push(album.id);
                                }
                            });

                            spotifyApi.getAlbums(albumsArray)
                                .then(data => {
                                    console.log(colors.green('----> Fetched ALBUM data'));
                                    if (data.body) {
                                        const albumsData = data.body.albums;
                                        let albumsDataBaseArray = [];

                                        albumsData.forEach((album, albumKey) => {
                                            albumsDataBaseArray.push({
                                                docType : 'ALBUM',
                                                name: album.name,
                                                url: album.images[0].url,
                                                releaseDate: album.release_date
                                            });

                                            console.log(colors.green('----> Dealing with TRACKS data'));
                                            //Writing tracks
                                            const tracks = album.tracks.items.map((track) => {
                                                return {
                                                    disc_number: track.disc_number,
                                                    name: track.name,
                                                    duration_ms: track.disc_number,
                                                    track_number: track.track_number,
                                                    docType: 'TRACK'
                                                };
                                            });

                                            const tracksFileName = `database/seeds/tracks/${_.snakeCase(artistName)}_album_${albumKey}_tracks.json`;
                                            fs.writeFileAsync(tracksFileName, JSON.stringify(tracks), "utf8");
                                        });

                                        const fileName = `database/seeds/albums/${_.snakeCase(artistName)}_albums.json`;

                                        //Writing albums file
                                        fs.writeFileAsync(fileName, JSON.stringify(albumsDataBaseArray), "utf8");
                                    }
                                })
                        }
                    }, err => {
                        console.log(colors.red('Error while fetching data'));
                        console.error(err);
                    });

            });
        }
    }, err => {
        console.log(colors.red('Error while fetching data'));
        console.error(err);
    });