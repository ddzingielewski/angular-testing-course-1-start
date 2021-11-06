import { fakeAsync, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async Testing Examples", () => {
    it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
        let test = false;
        setTimeout(() => {
            console.log('running assertions');
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 1000);
    });

    it("Asynchronous test example - setTimeout()", fakeAsync(() => {
        let test = false;
        setTimeout(() => {
            console.log('running assertions - setTimeout()');
            test = true;
        }, 1000);

        tick(1000);
        expect(test).toBeTruthy();
    }));

    it('Asynchronous test example - plain Promise', fakeAsync(()=>{
        let test = false;
        console.log('Creating promise');
        Promise.resolve().then(()=>{
            console.log('Inside a first promise');
        }).then(()=>{
            console.log('Inside a second promise');
            test = true;
        });
        flushMicrotasks();
        console.log('Veryfing assertions');
        expect(test).toBeTruthy();
    }));

    it('Asynchronous test example - mixed Promise and setTimeout', fakeAsync(()=>{
        let counter = 0;
        console.log('Creating promise');
        Promise.resolve().then(()=>{
            console.log('Inside a first promise');
            counter+=10;
            setTimeout(() => {
                console.log('running assertions - setTimeout()');
                counter+=1;
            }, 1000);
        });
        console.log('Veryfing assertions');
        expect(counter).toBe(0);
        flushMicrotasks();
        expect(counter).toBe(10);
        tick(1000);
        expect(counter).toBe(11);
    }));

    it('Asynchronous test example - OBservables', fakeAsync(()=>{
        let test = false;
        console.log('Creating Observable');
        const test$ = of(test).pipe(delay(1000));
        test$.subscribe(()=>{
            test = true;
        });
        tick(1000);
        console.log('Running test assertions');
        expect(test).toBe(true);
    }));
})