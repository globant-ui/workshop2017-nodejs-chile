import {callAPI} from '../utils';
import {commentSignature} from '../signatures/comment';



let res;
let json;


describe(`The route`, () => {
	describe(`to /comments/:id`, () => {
		beforeAll((done) => {
			callAPI('/comments/BftxkuizwrFlQOjv')
			  .then(data => res = data)
			  .then(data => res.json())
			  .then(data => json = data)
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
