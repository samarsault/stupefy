Stupefy
---

Stupefy is a lightweight, extensible Javascript-based preprocessor engine. And yes, its *unbiased* and usable with any file type.
Plugins form the base of stupefy.

Installation
---
Stupefy can be installed using npm
```sh
$ npm install stupefy -g
```

Usage
---
```sh
$ stupefy [options] <file name>
```

Syntax
---
Default Stupefy tags start with '{%' and end with '%}', which can be customized as convenient.
Each tag(preprocessor directive) calls a function, which is a plugin. For example,

```html
{% define(title, STUPEFY) %}
<head>
	<title>{% print(title) %}</title>
	<style>
	{% include(inline-styles.css) %}
	</style>
</head>
```

The above, on being stupefied, will fetch 'inline-styles.css' and replace the tag with that.

Built-In Plugins
---

- define(*variable name*, *value*) - define a variable
- print(*variable name*) - print variable
- include(*filepath*) - include another file
- include_p(*filepath*) - preprocessor and then include the file

Configuration
---
The configuration file is stored in ```~/.stupefy.json```. Example config file:

```json
{
	"tag_start": "{{",
	"tag_end": "}}",
	"plugins": [ "~/fetch.js", "./LICENSES.js" ]
}
```
**NOTE**: If plugin is available as a node module, the module name can be used instead of path.

Also, each field is optional

Custom Plugins
---

If we make a plugin to fetch data from a url and paste it in the document ->

```js
// fetch.js
module.exports = function(stupefy)
{
	return {
		fetch: function(url) {
			var content = download(url)
			return content;
		}
	}
}	
```

This can be used as ->

```html
<script>{% fetch(http://example.com/jquery.js) %}</script>
```
