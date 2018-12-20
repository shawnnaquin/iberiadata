# HOW TO USE
- requirements: NODE
- clone repo
- run ```npm i```;
- copy data from `item list.pdf`
- paste copied data into `temp.txt`
- format data (use current `temp.txt` as example)

```
${name} (String)
${item-id} (String || null)
${category} (String || null)
${line-item}
${line-item}
... more lines ...
\n
${name} (String)
... more lines ...
\n
```

example ${line-item}:
```
line-name + ' ' + payor-id + ' ' + date + ' ' + price
```

Valid line-name:
```
[ `Blue Cross`, `Medicaid`, `Medicare A`, `Medicare B`, `Private`, `Veterans` ]
```
(note: capitol first letter!)

- run the program...
```
npm run go
```
- the program will warn errors or duplicate keys;
- if duplicate, manually handle duplicate key
- reindent `save.json`
- compare `temp.txt` data to `save.json`
- your're done!