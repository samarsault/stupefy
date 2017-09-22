var stupefy = require("..");
var fs = require("fs");
var ver = require("../package").version;
var path = require("path");
var prog = require("caporal");
var spellbook = require("../lib/spellbook")(stupefy);

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
	.command("enchant", "Enchant a File")
	.argument("<file>", "Path to file")
	.option("-o <outputfile>", "Output File Location")
	.action(function(args, options, logger) {
		var fpath = args.file;
		var op = options.o;
		if(fs.existsSync(fpath)) {
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
			console.error("Error: File not found");
		}
	})
	.command("install", "Add a spellbook")
	.argument("<url>", "spellbook repository url")
	.action(function(args, options, logger) {
		var repo = args.url;
		spellbook.fetch(repo);
	})
	.command("update", "Update all spells")
	.action(function() {
		spellbook.update();
	})
	.command("search", "Search for a spell")
	.argument("<name>", "Name of the spell")
	.action(function(args, options, logger) {
		var sName = args.name;
		var results = spellbook.list(sName);
		if (results.length == 0)
			console.log("No such spell matching: " + sName);
		else {
			results.forEach(function(item) {
				console.log(path.relative(stupefy.conf["spells"], item));
			});
		}
	})
	.command("list", "List spells")
	.action(function() {
	// list spells
		spellbook.list().forEach(function(item) {
			console.log(path.relative(stupefy.conf["spells"], item));
		});
	});

prog.parse(process.argv);