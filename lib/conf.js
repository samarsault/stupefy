var fs = require('fs');
var path = require('path');

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var filePath = path.join(getUserHome(), '.stupefy.json'); 

if (fs.existsSync(filePath)) {
    module.exports = require(filePath);
} else {
    module.exports = -1;
}
