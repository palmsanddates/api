require('dotenv').config();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const chai = require('chai');

chai.use(chaiHttp);

const server = require('../app');
const { response } = require('express');

const agent = chai.request.agent(server);
const should = chai.should();

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});

// describe('Index API endpoints', () => {
//     // example
//     it('should be return a greeting', (done) => {
//         agent.get('/').end((err, res) => {
//             res.should.have.status(200);
//             done();
//         });
//     });

describe("POST /api/events", () => {
    it("it should POST a new event", (done) => {
        const EventId = 1
        chai.request(server)
            .get("/events" + EventId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('id');
                response.body.should.have.property('collaborators');
                response.body.should.have.property('department');
                response.body.should.have.property('event name');
                response.body.should.have.property('event date');
                response.body.should.have.property('event time');
                response.body.should.have.property('event location');
                response.body.should.have.property('event towards');
                response.body.should.have.property('event flyer')
                response.body.should.have.property('budget');
                response.body.should.have.property('number of attendees');
                done();
            });
    });
    it("it should not post a new event without the name property", (done) => {
        const event = {
            completed = false
        }
        chai.request(server)
            .post("/events")
            .send(event)
            .end((err, respoonse) => {
                response.should.have.status(400)
                response.getMaxListeners.should.be.eq("Only RA's can post events")
                done();
            })
    })
})

describe("PATCH /event/:id", () => {
    it("it should PATCH an existing event", (done) => {
        const eventId = 1
        const event = {
            name = "Event 1 patch"
        }
        chai.request(server)
            .patch("/event" + eventId)
            .send(event)
            .end((err, response) => {
                response.should.have.status(200)
                response.body.should.be.a("object")
                response.body.should.have.property('id').eq(1)
                response.body.should.have.property('name').eq("event 1 patch")
                response.body.should.have.property('completed').eq(True)
                done()
            })
    })

    it("should NOT PATCH and existing event if not a RA", (done) => {
        const eventId = 1
        const event = {
            name: "event"
        }
        chai.request(server)
            .patch("/event" + eventId)
            .send(event)
            .end((err, response) => {
                response.should.have.status(400)
                response.text.should.be.eq("Only RA's can update event")
                done()
            })
    })
})

describe('DELETE /event/:id', (done) => {
    it("it should DELETE an existing event"), (done) => {
        const eventId = 1
        chai.request(server)
            .delete('/event/' + eventId)
            .end((err, response) => {
                response.should.have.status(200)
                done()
            })
    }
    it("it sohuld NOT DELETE an existing event that is not in the database", (done) => {
        const eventId = 145
        chai.request(server)
            .delte("/event/" + eventId)
            .end((err, response) => {
                response.should.have.status(404)
                response.text.should.be.eq("Othe task with the provided ID does not exist")
                done()
            })
    })
})

// after((done) => {
// done();
// });
// });