#!/usr/bin/env node
var stupefy = require("../index");
var program = require("commander");
var fs = require("fs");

var fpath;

// Commander
program
	.version('1.0.3')
	.arguments('<file>')
	.action(function (fp) {
		fpath = fp;
	})
	.option('-s, --save [path]', 'Save location')
	.parse(process.argv);

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
