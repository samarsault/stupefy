//
// Stupefy.js
// Process text and yield output
//

module.exports = function (str) {

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
		if (match(this.expr.start, i)) // detected preprocessor directive
		{
			start = i - 1;
			var tokStr = ""; // token
			i += this.expr.start.length;

			while (i < str.length && !match(this.expr.end, i))
			{
				if (str[i] == "\n")
					this.error("Expected: %}")
				tokStr += str[i];
				i++;
			}

			i += this.expr.end.length - 1;

			var token = this.tokenize(tokStr.replace(/ /g, ""));

			if (typeof this.plugins[token.name] == "undefined")
			{
				this.error("Plugin " + token.name + " not found."); // called plugin not found
			}
			else
			{
				var output = this.plugins[token.name].apply(this, token.arguments);
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