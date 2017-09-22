# stupefy
Stupefy is a tool for rapid prototyping of scripts/sites/apps etc.

## How it works

```GIF HERE```

Stupefy enchants(modify) your code with "spells", so called [Handlebars](http://handlebarsjs.com) templates which are inserted into your code on enchantment. 

Spells are there in spellbooks, which are mere git repositories containing a couple of such Handlebars templates. One such being [this](http://github.com/thelehhman/spellbook).

The spellbook can be installed using

```sh
$ stupefy install https://github.com/thelehhman/spellbook
```

Spells can be updated anytime using the command
```sh
$ stupefy update
```

## Installation and Usage

```sh
$ npm install -g stupefy
```

It can then be used as -
```sh
$ stupefy enchant <filename>
```