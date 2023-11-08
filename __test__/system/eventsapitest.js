const axios = require('axios');
const baseurl = 'http://localhost:3000/events'

describe('eventsAPI', () => {

    it('post a event', async () => {
        return axios.post(baseurl, {
            'name': 'Awareness',
            'eventtype': 'Awareness',
            'desc': 'Traffic Rules Awareness',
            'location': 'Kathmandu'
        })
            .then((event) => {
                expect(event.data.name).toEqual('Awareness');
            })
    });
    it('gets all events', async () => {
        return axios.get(baseurl)
            .then((events) => {
                expect(events.data[0].name).toEqual("Awareness");
            });
    });
});