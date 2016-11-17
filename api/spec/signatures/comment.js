export const commentSignature = {
    "docType": jasmine.stringMatching(/^[\w]+$/),
    "message": jasmine.any(String),
    "name": jasmine.any(String),
    "_id": jasmine.stringMatching(/^[\w]+$/),
    "createdAt": jasmine.stringMatching(/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}Z$/),
    "updatedAt": jasmine.stringMatching(/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}Z$/)
};
