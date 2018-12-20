var fs = require('fs');
var save = require('./save.json');

function readModuleFile(path, callback) {
    try {
        var filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

// var allItems = {};

readModuleFile('./temp.txt', function (err, words) {

    const allLines = words.split(/\r\n|\n/);

    const data = [];
    var t = [];

    allLines.forEach( (line)=> {

        if ( line === '' ) {
            data.push(t);
            t = [];
        } else {
            line = line.replace(/^\s+|\s+$/g, '');
            t.push(line);
        }

    });


    data.forEach( (item) => {

        allItems[ item[0] ] = {
            "name": item[0],
            "item-id": item[1],
            "category": item[2],
            "items": []
        }

        subitems = {
            'Blue Cross': [],
            'Medicare A': [],
            'Medicare B': [],
            'Medicaid': [],
            'Private': [],
            'Veterans': []
        };

        item.forEach( (line, linenumber ) => {

            var name = line.split(' ').splice(0, 2).join(' ').replace(/\d+/g,'').replace(/\s*$/,'');
            var shortname = name == 'Blue Cross' ? 'Blue Cross' : name.split(' ')[0];

            if( linenumber > 2 ) {

                subitems[name].push(
                    {
                        "price": line.split(' ').slice(-2)[1],
                        "effective-date": line.split(' ').slice(-2)[0]
                    }
                );
            }

        });

        allItems[ item[0] ] = doItem( item[0], subitems );

    });

    console.log( allItems );

});

function doItem( name, subitems ) {

    var t = {
        'Medicare A': [],
        'Medicare B': []
    }

    Object.keys(subitems).forEach( (key) =>{

        if ( !subitems[key].length ){
            delete subitems[key];
        }

    });

    Object.keys(subitems).forEach( (key) =>{

        if ( key == 'Medicare A' || key == 'Medicare B') {
            t[key] = subitems[key];
            delete subitems[key];
        }

    });

    if ( t['Medicare A'].length || t['Medicare B'].length ) {
        subitems['Medicare'] = t;
    }

    var f = [];

    Object.keys(subitems).forEach((key)=> {
        f.push ( doLine( key, subitems[key] ) );
    });

    return f;

}

function doLine(name, line) {
    return itemMaker[name](name,line);
}

var itemMaker = {
    'Medicare': (name,line)=>{

        line['Medicare A'].forEach( (line)=> {
            line['name'] = 'Medicare A';
        })

        line['Medicare B'].forEach( (line) => {
            line['name'] = 'Medicare B';
        });

        return {
            "type": name,
            "subtypes": [
              {
                "name": "Medicare A",
                "payor-id": "3003",
                "subitems": line['Medicare A']
              },
              {
                "name": "Medicare B",
                "payor-id": "3004",
                "subitems": line['Medicare B']
              }

            ]
        }
    },
    'Blue Cross': (name,line)=>{
        line.forEach( (l)=> {
            l['name'] = name;
        });

        return {
            "type": name,
            "subtypes": [
              {
                "name": name,
                "payor-id": "3001",
                "subitems": line
              }
            ]
        }
    },
    'Medicaid': (name,line)=>{
        line.forEach( (l)=> {
            l['name'] = name;
        });

        return {
            "type": name,
            "subtypes": [
              {
                "name": name,
                "payor-id": "3002",
                "subitems": line
              }
            ]
        }
    },
    'Private': (name,line)=>{
        line.forEach( (l)=> {
            l['name'] = name;
        });

        return {
            "type": name,
            "subtypes": [
              {
                "name": name,
                "payor-id": "3005",
                "subitems": line
              }
            ]
        }
    },
    'Veterans': (name,line)=>{
        line.forEach( (l)=> {
            l['name'] = name;
        });

        return {
            "type": name,
            "subtypes": [
              {
                "name": name,
                "payor-id": "3006",
                "subitems": line
              }
            ]
        }
    }
};
