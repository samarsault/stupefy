var assert = require('assert');
var fs = require('fs');
var stupefy = require('..');

var $ = function(cmd) {
    return require('child_process').execSync("node ./bin/cli.js " + cmd, { 'encoding':'utf8'})
}

describe('CLI', () => {
    before(()=>{
    });
    it('Lists spells correctly', ()=> {
        assert.equal($('list').split('search readFile').length, 1);
    });
    it('Enchants correctly', () => {
        $('enchant ./examples/test.html -o test2.html -s ./tests/test_spells');
        if (fs.existsSync('test2.html')) {
            assert.notEqual(fs.readFileSync('test2.html', 'utf8').indexOf('<script src'), -1);
            fs.unlinkSync('test2.html');
        } else {
            done(new Error("Not outputting file"))
        }
    })
});
