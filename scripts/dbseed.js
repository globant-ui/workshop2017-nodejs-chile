const _ = require('lodash');
const colors = require('colors/safe');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));

import {database} from '../database';


const tracksFolderPath = './database/seeds/tracks';


fs.readdirAsync(tracksFolderPath)
    .then(trackFileNames => {
        const bandNames = _.uniq(trackFileNames.map(trackFileName => trackFileName.substring(0, trackFileName.indexOf('_album'))));
        const seedData = bandNames.map(bandName => {
            const requirePath = '../database/seeds/';
            return {
                albums: require(requirePath + 'albums/' + bandName + '_albums.json'),
                artists: require(requirePath + 'artists/' + bandName + '_artists.json'),
                band: require(requirePath + 'bands/' + bandName + '_band.json'),
                tracks: _.filter(trackFileNames, trackFileName => _.startsWith(trackFileName, bandName)).map(fileName =>
                    require(requirePath + 'tracks/' + fileName)
                )
            };
        });

        seedDatabase(seedData);
    })
    .catch(error => {
        console.log(colors.red('Error while reading seeds', error));
    });



//The DB engine adds a unique hash as id for each insertion
const seedDatabase = function (seed) {
    seed.map(entry => {
        let band = Object.assign({}, entry.band);

        //Insert tracks by album

        const insertTracksPromises = entry.tracks.map(tracksByAlbum => {
            const tracksWithComments = tracksByAlbum.map(track => {
                return Object.assign({}, track, {comments: [], commentsCount: 0});
            });
            return database.insert(tracksWithComments);
        });

        Promise.map(insertTracksPromises, (tracksByAlbum, index) => {
            //Insert albums
            const trackIds = tracksByAlbum.map(track => track._id);
            const album = Object.assign({}, entry.albums[index], {tracks: trackIds});

            return database.insert(album);
        })
            .then(insertedAlbums => {
                band.albums = insertedAlbums.map(album => album._id);

                //Insert artists
                return database.insert(entry.artists);
            })
            .then(insertedArtists => {
                band.artists =  insertedArtists.map(artist => artist._id);

                //Insert band
                return database.insert(band);
            })
            .then(insertedBand => {
                console.log(colors.green(`Band "${insertedBand.name}" added to database`));
            })
            .catch(error => {
                console.log(colors.red('Can\'t fill the database with new data. Printing error.'));
                console.log(error);
            });
    });
}
