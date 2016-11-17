export const albumSignature = {
    "docType": jasmine.stringMatching(/^[\w]+$/),
    "name": jasmine.stringMatching(/^.*$/),
    "url": jasmine.stringMatching(/^.*$/),
    "releaseDate": jasmine.stringMatching(/^[\d]{4}(-[\d]{2})?(-[\d]{2})?$/),
    "tracks": jasmine.any(Array),
    "_id": jasmine.stringMatching(/^[\w]+$/),
    "createdAt": jasmine.stringMatching(/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}Z$/),
    "updatedAt": jasmine.stringMatching(/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}Z$/),
};
