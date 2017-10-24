var JSON5 = require("json5");
var fs = require("fs");

module.exports = function (stupefy) {
	var self = stupefy;
	var enchant = stupefy.sbook.enchant;

	return {
		tokenize: function(token) {
			var at = 0, // index of current character
				defStr = "",
				Tok = { // token
					name: "",
					arg: "",
					data: { }
				};
			
			while (at < token.length && token[at] != ",")
			{
				defStr += token[at];
				at++;
			}
			var def = defStr.trim().split(" ");
			Tok.name = def[0];
			
			if (def.length > 1)
				Tok.arg = def[1];
			
			// skip ',' character
			at++;
			if (at < token.length) {
				var s = "{" + token.substr(at, token.length - at) + "}";
				Tok.data = JSON5.parse(s);
			}
			return Tok;
		},
		def: function(name, data) {
			if (name == "global") {
				for (var item in data)
					self.variables[item] = data[item];
			}
			return null;
		},
		print: function(name) {
			return self.variables[name];
		},
		enchant: function(name, data) {
			return enchant(name, data, self);
		},
		include: function(fileName) {
			return fs.readFileSync(fileName, "utf8");
		},
		process: function(str) {
			// (pre)processed text/code
			var outp = "";
			var match = function (start, at) {
				var tks = "";
				for (var i = 0;i < start.length;i++)
					tks += str[at + i];
				return tks == start;
			};
			
			for (var i = 0;i < str.length;i++)
			{
				if (match(self.expr.start, i)) // detected preprocessor directive
				{
					var tokStr = ""; // token
					i += self.expr.start.length;
					
					while (i < str.length && !match(self.expr.end, i))
					{
						if (str[i] == "\n" && self.expr.end != "\n")
							self.error("Expected: " + self.expr.end);
						tokStr += str[i];
						i++;
					}
					
					i += self.expr.end.length - 1;
					
					var token = this.tokenize(tokStr.trim());
					if (typeof this[token.name] == "undefined")
					{
						outp += self.expr.start + tokStr + self.expr.end;
						// it's not a plugin self.error(token.name + " is not defined");
					}
					else
					{
						var output = this[token.name](token.arg, token.data);
						if (output != null)
							outp += output; // append output to string
					}
				}
				else
				{
					outp += str[i];
				}
			}
			
			return outp;
		}
	};
};