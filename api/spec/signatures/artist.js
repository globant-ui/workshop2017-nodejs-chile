export const artistSignature = {
    "docType": jasmine.stringMatching(/^[\w]+$/),
    "_id": jasmine.stringMatching(/^[\w]+$/),
    "firstName": jasmine.stringMatching(/^.*$/),
    "lastName": jasmine.stringMatching(/^.*$/),
    "birthdate": jasmine.stringMatching(/^[\d]{4}-[\d]{2}-[\d]{2}(T[\d]{2}:[\d]{2}:[\d]{2}\-[\d]{4})?$/),
    "createdAt": jasmine.stringMatching(/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}Z$/),
    "updatedAt": jasmine.stringMatching(/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}Z$/),
}
