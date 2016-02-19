//
// Stupify
// Tokenize directive
//

module.exports = function(token) {
	var at = 0, // index of current character
		args = "",
		Tok = { // token
			name: "",
			arguments: []
		};

	var split = false;

	while (token[at] != "(")
	{
		Tok.name += token[at];
		at++;
	}

	// skip '(' character
	at++;

	while (token[at] != ")")
	{
		if (token[at] == ",")
			split = true;

		if (token[at] != " ")
			args += token[at];
		
		at++;
	}

	Tok.name = Tok.name.trim();

	if (split)
		Tok.arguments = args.trim().split(',');
	else
		Tok.arguments = [args.trim()];

	return Tok;
}