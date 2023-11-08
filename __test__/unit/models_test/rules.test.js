const Rules = require('../../../models/Rule');
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
     //await mongoose.connection.db.dropDatabase();
    //await mongoose.connection.close();
});

describe('RuleSchema', () => {
    it('Should be able create a rule', () => {
        let rule = {
            'name': 'Lane',
            'desc': 'Traffic Rule',
            'fines': '1000'
        };
        // const hero_1 = await Heroes.create(hero);
        return Rules.create(rule)
            .then((rule_1) => {
                expect(rule_1.name).toEqual('Lane');
            });
    });

    it('Should be able to update rule', async ()=> {
        let rule = await Rules.findOne({'name': 'Lane'});
        rule.fines = '500';
        let updated_rule = await rule.save();
        expect(updated_rule.fines).toEqual('500');
    });


    it('should be able to remove all rules', async () => {
        const status = await Rules.deleteMany();
        expect(status.ok).toBe(1);
    });
})