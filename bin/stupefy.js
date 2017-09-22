#!/usr/bin/env node
var stupefy = require("../index");
var program = require("commander");
var fs = require("fs");
var ver = require("../package").version
var path = require('path');

var fpath;

// Commander
program
	.version(ver)
	.arguments('<file>')
	.action(function (fp) {
		fpath = fp;
	})
	.option('-s, --save [path]', 'Save location')
	.parse(process.argv);

function autoTags(ext) {
	ext = ext.toLowerCase();
	expr = { };
	switch (ext) {
		case '.js':case '.cpp':case '.c':case '.java': case '.cs':
		case '.css': case '.less': case '.scss': case '.ts': case '.sql':
		case '.go':
			expr.start = "/*";
			expr.end = "*/";
			break;
		case '.py': case '.rb': case '.sh':
			expr.start = '#'
			expr.end = '\n'
			break;
		default:
			expr.start = "{%";
			expr.end = "%}"
	}
	return expr;
}

stupefy.init();

if (typeof fpath != "undefined") {
	// check file exists
	fs.exists(fpath, function (yes) {
		if (yes) 
		{
			// read file
			fs.readFile(fpath, 'utf8', function(err, data) {
				if (err) 
				{
					console.error(err);
				}
				else
				{
					if (stupefy.autoTags)
						stupefy.expr = autoTags(path.extname( fpath ));
					var outp = stupefy.process(data);
					if (typeof program.save != "undefined")
					{
						fs.writeFile(program.save, outp, function (error){
							if (error)
								console.error(error);
						});
					}
					else
					{
						console.log(outp);
					}
				}
			});
		} 
		else {
			console.error("Error: File not found");
		}
	});
} else {
	program.outputHelp();
}
