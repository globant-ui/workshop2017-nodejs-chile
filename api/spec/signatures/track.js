export const trackSignature = {
    "disc_number": jasmine.any(Number),
    "name": jasmine.any(String),
    "duration_ms": jasmine.any(Number),
    "track_number": jasmine.any(Number),
    "docType": jasmine.stringMatching(/^[\w]+$/),
    "comments": jasmine.any(Array),
    "commentsCount": jasmine.any(Number),
    "_id": jasmine.stringMatching(/^[\w]+$/),
    "createdAt": jasmine.stringMatching(/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}Z$/),
    "updatedAt": jasmine.stringMatching(/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}Z$/)
};
