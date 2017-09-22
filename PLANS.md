# Stupefy

A tool for Rapid prototyping apps
Stupefy uses stored regularly used snippets(spells) and inserts it into your code 

Spells can be stored locally in ~/.spells as well as in a remote repository
Local Spells are given preference over remote

Code logically, not syntactically.

## CLI

```sh
$ stupefy search <spell>
$ stupefy enchant <file> (or) $ stupefy <file>
$ stupefy add <spell>
$ stupefy list
$ stupefy show # shows local spells
```

## Syntax

    /* enchant $, n: [ 1, 2, 3 ], s: "abc" */
    /* enchant $ */
    /* def, a: 3, b: [ 1, 2 ] */
## SpellBook Structure

-|
 |--html
 |--|--$
 |--|--bootstrap
 |--js

## Example

- Easy Coding

```cpp
    void sort(int * arr, int n) {
        /* enchant mergesort arr n */    
    }
```

Running Stupefy will replace the comment with merge sort code in it

.gitignore

```
/* enchant nodejs */
```

- Rapid prototyping

```html
    <html>
        <head>
            <!-- enchant bootstrap -->
            <!-- enchant fontawesome -->
            <!-- enchant $ -->
            <!-- enchant normalize -->
        </head>
        <body>
            <!-- enchant expr-hello -->
        </body>
    </html>
```
- One Code - Many Languages

No need to look up the docs every time while learning a new language

```python
s = ''
# enchant readFile "file.txt" into s
print s
```

```java
public static void main(String[] args) {
    String s;
    /* enchant readFile "file.txt" into s */
    System.out.println(s);
}
```

Both give the same output.


## Conf parameters

```json
{
    "tag_start":  string
    "tag_end": string
    "auto_tag": bool 
    "plugins": array
    "spells": string
}
```

# Spells Meta (Auto-Generated)

```json
[
    { "dir": "folder_name", "remote": "repo link" }
]
```