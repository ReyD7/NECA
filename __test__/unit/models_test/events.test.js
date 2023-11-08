const Events = require('../../../models/Event');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test_mydb';

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    // await mongoose.connection.dropCollection('heros');
     await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('EventSchema', () => {
    it('Should be able create a event', () => {
        let event = {
            'name': 'Aware',
            'eventtype': 'Awareness',
            'desc': 'Traffic Rules Awareness',
            'location': 'Kathmandu'
        };
        // const hero_1 = await Heroes.create(hero);
        return Events.create(event)
            .then((event_1) => {
                expect(event_1.name).toEqual('Aware');
            });
    });
    it('Should be able to update event', async ()=> {
        let event = await Events.findOne({'name': 'Aware'});
        event.location = 'Pokhara';
        let updated_event = await event.save();
        expect(updated_event.location).toEqual('Pokhara');
    });

    it('should be able to remove all events', async () => {
        const status = await Events.deleteMany();
        expect(status.ok).toBe(1);
    });
})