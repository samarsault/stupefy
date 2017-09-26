#!/usr/bin/env node

var stupefy = require("..");
var fs = require("fs");
var ver = require("../package").version;
var path = require("path");
// var prog = require("caporal");
var prog = require("commander");
var spellbook = stupefy.sbook;

function autoTags(ext) {
	ext = ext.toLowerCase();
	var expr = { };
	switch (ext) {
	case ".js":case ".cpp":case ".c":case ".java": case ".cs":
	case ".css": case ".less": case ".scss": case ".ts": case ".sql":
	case ".go":
		expr.start = "/*";
		expr.end = "*/";
		break;
	case ".py": case ".rb": case ".sh":
		expr.start = "#";
		expr.end = "\n";
		break;
	case ".html": case ".htm":
		expr.start = "<!--";
		expr.end = "-->";
		break;
	default:
		expr.start = "{%";
		expr.end = "%}";
	}
	return expr;
}

stupefy.init();

prog
	.version(ver)
	.option("-o, --output [ofile]", "output file location (Optional)");

prog
	.command("enchant [file]")
	.description("Enchant a File")
	.action(function(fpath, options) {
		var op = options.parent.output;
		if(typeof fpath != "undefined" && fs.existsSync(fpath)) {
		// read file
			fs.readFile(fpath, "utf8", function(err, data) {
				if (err) {
					stupefy.error(err);
				}
				else {
					var ext = path.extname(fpath).toLowerCase();
					if (stupefy.autoTags) {
						stupefy.expr = autoTags(ext);
					}
					// assing language
					stupefy.variables["lang_" + ext.substring(1, ext.length)] = true;
				
					var outp = stupefy.engine.process(data);
					if (typeof op != "undefined")
					{
						fs.writeFile(op, outp, function (error){
							if (error)
								stupefy.error(error);
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
			stupefy.error("Error: File Not Found");
		}
	});

prog
	.command("install [url]")
	.description( "Add a spellbook")
	.action(function(repo) {
		if (typeof repo == "undefined")
			return;
		spellbook.fetch(repo);
	});

prog
	.command("update")
	.description("Update all spells")
	.action(function() {
		var repos = fs.readdirSync(stupefy.conf["spells"]).filter(function(name) {
			return fs.statSync(path.join(stupefy.conf["spells"], name)).isDirectory();
		});
		var i = 0;
		if (repos)
		{
			spellbook.update(repos[i], function() {
				i++;
				if (i < repos.length)
					spellbook.update(repos[i]);
			});
		}
	});
prog
	.command("search [name]")
	.description("Search for a spell")
	.action(function(sName) {
		if (typeof sName == "undefined")
			return;
		var results = spellbook.list(sName);
		if (results.length == 0)
			console.log("No such spell matching: " + sName);
		else {
			results.forEach(function(item) {
				console.log(path.relative(stupefy.conf["spells"], item));
			});
		}
	});

prog
	.command("list")
	.description("List spells")
	.action(function() {
		// list spells
		spellbook.list().forEach(function(item) {
			console.log(path.relative(stupefy.conf["spells"], item));
		});
	});

prog.parse(process.argv);