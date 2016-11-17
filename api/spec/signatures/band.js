export const bandSignature = {
    "docType": jasmine.stringMatching(/^[\w]+$/),
    "genres": jasmine.any(String),
    "name": jasmine.any(String),
    "url": jasmine.any(String),
    "popularity": jasmine.any(Number),
    "albums": jasmine.any(Array),
    "artists": jasmine.any(Array),
    "_id": jasmine.stringMatching(/^[\w]+$/),
    "createdAt": jasmine.stringMatching(/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}Z$/),
    "updatedAt": jasmine.stringMatching(/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}Z$/),
};
