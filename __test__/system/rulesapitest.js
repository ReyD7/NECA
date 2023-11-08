const axios = require('axios');
const baseurl = 'http://localhost:3000/rules'

describe('rulessAPI', () => {

    it('post a rule', async () => {
        return axios.post(baseurl, {
            'name': 'Lane',
            'desc': 'Traffic Rule',
            'fines': '1000'
        })
            .then((rule) => {
                expect(rule.data.name).toEqual('Lane');
            })
    });
    it('gets all rules', async () => {
        return axios.get(baseurl)
            .then((rules) => {
                expect(rules.data[0].name).toEqual("Lane");
            });
    });
});