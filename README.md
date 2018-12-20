# HOW TO USE
- requirements: NODE
- clone repo
- run ```npm i```;
- copy data from `item list.pdf`
- paste copied data into `temp.txt`
- manually format data in `temp.txt` (use current `temp.txt` as example)
- manually filter out any private data from `temp.txt`!

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
```npm run count```
```
1064 unique items found!
```

### get the highest price item

```npm run highest```
```
{ name: 'IVC FILTER INSERTION', price: 13542 }
```

# NOTES

### Main Object Prototype `save.json`

```
(Object)
	name (Object) (String)
		name (String)
		item-id (String)
		category (String)
		items (Array)
			(Object)
				type (String)
				subtypes (Array)
					(Object)
						name (String)
						payor-id (String)
						subitems (Array)
							(Object)
								name (String)
								effective-date (String)
								price (String)
```

### Other Notes
the resulting `save.json` object keys are string escaped for valid JSON, they won't match the pdf in some cases, for instance:

```
BLOOD COL. NEEDLE 21GX1/4"
```
becomes
```
BLOOD COL. NEEDLE 21GX1/4\"
```
(note the string escaped " character )