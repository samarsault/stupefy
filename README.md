Stupefy
---

Stupefy is a lightweight, extensible Javascript-based preprocessor engine. And yes, its *unbiased* and usable with any file type.
Plugins form the base of stupefy.

Install
---
Stupefy can be installed using npm
```sh
$ npm install stupefy
```
If you want to use the CLI, you can 
```sh
$ npm install stupefy -g
```

Format
---
Default Stupefy tags start with '{%' and end with '%}', which can be customized according to needs.
Each tag(preprocessor directive) has within it a function declaration. For example,

```html
<head>
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