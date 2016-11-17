import {callAPI} from '../utils';
import {trackSignature} from '../signatures/track';
import {commentSignature} from '../signatures/comment';



let res;
let json;





fdescribe(`The route`, () => {
    fdescribe(`to /tracks`, () => {
        beforeAll((done) => {
            callAPI('/tracks')
                .then(data => res = data)
                .then(data => res.json())
                .then(data => json = data)
                .then(done, done.fail);
        });


        it(`should return a 200 status code`, () => {
            expect(res.status).toBe(200);
        });


        it(`should return an array of bands`, () => {
            expect(json).toEqual(jasmine.any(Array));
        });


        it(`should be and object`, function () {
            expect(json.every(item => item instanceof Object)).toBe(true);
        });

        // registers multiple tests
        registerAllAPIAttrTests(trackSignature);
    });


	describe(`to /tracks/:id`, () => {
		beforeAll((done) => {
			callAPI('/tracks/01m3gq2ejrrY6n3f')
			  .then(data => res = data)
			  .then(data => res.json())
			  .then(data => json = data)
			  // registers multiple tests
			  .then(done, done.fail);
		});


		it(`should return a 200 status code`, () => {
			expect(res.status).toBe(200);
		});


		it(`should return an array of bands`, () => {
			expect(json).toEqual(jasmine.any(Object));
		});


		it(`should be and object`, function () {
			expect(json instanceof Object).toBe(true);
		});


		registerAllAPIAttrTests(trackSignature);
	});


	describe(`to /tracks/:id/comments`, () => {
		beforeAll((done) => {
			callAPI('/tracks/01m3gq2ejrrY6n3f/comments')
			  .then(data => res = data)
			  .then(data => res.json())
			  .then(data => json = data)
			  // registers multiple tests
			  .then(done, done.fail);
		});


		it(`should return a 200 status code`, () => {
			expect(res.status).toBe(200);
		});


		it(`should return an array of bands`, () => {
			expect(json).toEqual(jasmine.any(Object));
		});


		it(`should be and object`, function () {
			expect(json instanceof Object).toBe(true);
		});


		registerAllAPIAttrTests(commentSignature);
	});
});






function registerAllAPIAttrTests (itemSignature) {
    Object.keys(itemSignature).forEach(key => {
        it(`should be an object containing '${key}'`, () => {
            if (json instanceof Array) {
                expect(json.length).toBeGreaterThan(0);
            } else {
                json = [json];
            }

            json.forEach(item => {
                expect(item).toEqual(
                    jasmine.objectContaining({[key]: itemSignature[key]})
                );
            });
        });
    });
}
