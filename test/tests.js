const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const expect = chai.expect
//running these tests will run the app and update the database with operations below
//to test simply run NPM TEST in console.
//config chai
chai.use(chaiHttp);
chai.should();

describe('workers', () => {
    describe('ENDPOINTS /', () => {
        //test to get all workers
        it('should get all workers', (done) => {
            chai.request(app)
            .get('/api/workers')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done()
            })
        })
        it("should get a single worker's assigned orders", (done) => {
            const id = '5ce431125a46a224f4232235';
            chai.request(app)
                .get(`/api/workers/${id}/orders`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                 });
        });
        it("should add new worker and send back the object with new _id", (done) => {
            chai.request(app)
                .post(`/api/workers`)
                .set('content-type', 'application/json')
                .send({
                    name: 'Chai-test',
                    company: 'Chai-test-company',
                    email: 'chai@test.mocha'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                 });
        });
        it("should delete a worker and send back a confirmation object", (done) => {
            //must put existing worker id for test to pass.
            let _id = '5ce464c30fed4c474c55355c'
            chai.request(app)
                .delete(`/api/workers/${_id}`)
                .end((err, res) => {
                    expect(res.body).to.deep.equal({n:1, ok:1, deletedCount:1})
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                 });
        });
    })
})

describe('orders', () => {
    describe('ENDPOINTS /', () => {
        //test to get all orders
        it('should get all orders', (done) => {
            chai.request(app)
            .get('/api/orders')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done()
            })
        })
        it('should update an order adding a worker to the assignedWorker array', (done) => {
            //must enter real ids for test to pass.
            let worker_id = '5ce41e8d1afc4e45303e4acb'
            let order_id = '5ce436d5d8cb531ee84ff28e'
            chai.request(app)
            .put(`/api/addWorker/${worker_id}/toOrder/${order_id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body.assignedWorkers).to.deep.include(worker_id)
                done()
            })
        })
    })
})