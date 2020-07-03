# stupefy [![Build Status](https://travis-ci.org/samarsault/stupefy.svg?branch=master)](https://travis-ci.org/samarsault/stupefy)
Stupefy is a tool for rapid prototyping of scripts/sites/apps etc.

## Installation

```sh
$ npm install -g stupefy
```

Go ahead and create / install some spells now *(see below)*.

**NOTE**: To install and update spells, [git](https://git-scm.com/) is required

Read the Spell creation guide [here](https://github.com/thelehhman/stupefy/wiki/Spell-Creation).

## How it works

[![asciicast](https://asciinema.org/a/139693.png)](https://asciinema.org/a/139693?t=2&speed=1.5)

Stupefy *enchants*(modifies) your code with *spells*, i.e. just a fancy name for a couple of [Handlebars](http://handlebarsjs.com) templates which expand as snippets on steroids.

Spells are called using a specific syntax within your code comments i.e. -

```sh
 enchant <spell name>, key1: value1, key2: [ a1, a2 ] */
```
where spell name is the file name of the spell.

 For example,
```js
function print() {
    s = '';
    /* enchant readFile, file: 'hello.txt', str: 's'  */
    console.log(s);
}
```

This can be enchanted using:
```sh
$ stupefy enchant <filename> # optional: -o <outputfile>
```

Spells are present in spellbooks, which are mere git repositories comprising such Handlebars templates. Adding the templates to t One such being [this](http://github.com/thelehhman/spellbook).

The spellbook can be installed using

```sh
$ stupefy install https://github.com/thelehhman/spellbook
```

Spellbooks can be updated anytime using the command
```sh
$ stupefy update
```
## More Demos

One spell can be enchanted in many languages so that you focus on the application and not the syntax.

For example, here is a demo using the spell ``sieve`` in both C++ and Python

[![asciicast](https://asciinema.org/a/139713.png)](https://asciinema.org/a/139713?t=2&speed=1.5)
[![asciicast](https://asciinema.org/a/139716.png)](https://asciinema.org/a/139716?t=3&speed=1.5)

## Variables

Global variables can be defined using *def global*. In an HTML File, for example,
```html
<!-- def global, list: [ 1, 2, 3] -->
```

## Configuration

The file ```~/.stupefy.json``` can be configured to manipulate -
- The default opening and closing tag using : tag_start, tag_end, 
- The spellbooks directory, using: spells 
- Disabling language based opening and closing tags by setting : auto_tags
- Custom plugins using ``plugins`` array

## Stupefy v/s Snippets

- Language Independent (i.e. same spell can do same stuff across different languages)

  For example, the shell_exec spell allows you to forget about the standard library and emphasize the idea on different programming languages.
- Support Objects and Arrays as arguments to build up dynamic code (see bootstrap_nav)
- Code Editor Independent
- Spells are easier to manage than snippets
