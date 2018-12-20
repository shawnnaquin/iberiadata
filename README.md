# HOW TO USE
- requirements: NODE
- clone repo
- run ```npm i```;
- copy data from `item list.pdf`
- paste copied data into `temp.txt`
- format data (use current `temp.txt` as example)

example `temp.txt` format:
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

## TEST THE CODE IS MACHINE READABLE

### count the items
output
```
1064 unique items found!
```

### get the highest price item

```npm run highest```

output:
```
{ name: 'IVC FILTER INSERTION', price: 13542 }
```

# NOTE 
the resulting `save.json` object keys are string escaped for valid JSON, they won't match the pdf in some cases, for instance:

```
BLOOD COL. NEEDLE 21GX1/4"
```
becomes
```
BLOOD COL. NEEDLE 21GX1/4\"
```
(note the string escaped " character )