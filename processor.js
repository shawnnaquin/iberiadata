var fs = require('fs');

function readModuleFile(path, callback) {
    try {
        var filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

var item = {};

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


    data.forEach( (d,i)=> {

        item[d[0]] = {
            "name": d[0],
            "item-id": d[1],
            "category": d[2],
            "items": []
        }

        d.forEach( (l,p)=> {

            var name = l.split(' ').splice(0, 2).join(' ').replace(/\d+/g,'');
            var shortname = l.split(' ').splice(0, 1)[0];

            var cur = item[ d[0] ];
            var contains = false;

            if( p > 2 ) {

                for( var s = 0; s < cur.items.length; s++ ) {
                    if( cur.items.length && cur.items[s].type.includes( shortname ) ) {
                        contains = true;
                        break;
                    } else {

                    }
                }

                if ( !contains ) {
                    cur.items.push( line(l) );
                } else {
                    contains = false;
                }

                console.log( cur.items.filter(   ) )

                // if ( b.length ) {
                //     var c = 
                //         b[0].subtypes.filter( q => (
                //             q.name == name || q.name == shortname
                //         ) )[0];
                // }

            }

        });

    });

    // console.log( item );

});

function line(line) {
    if ( line.includes('Blue') ) {
        return BC;
    } else if ( line.includes('Medicaid') ) {
        return Medicaid;
    } else if ( line.includes('Medicare') ) {
        return Medicare;
    } else if ( line.includes('Veterans') ) {
        return Veterans;
    } else if ( line.includes('Private') ) {
        return Private;
    }
}

var BC =
    {
        "type": "Blue Cross",
        "subtypes": [
            {
                "name": "Blue Cross",
                "payor-id": "3001",
                "subitems": []
            }
        ]
    };

var Medicaid = 
{
    "type": "Medicaid",
    "subtypes": [
        {
            "name": "Medicaid",
            "payor-id": "3002",
            "subitems": []
        }
    ]
};

var Medicare = 
{
    "type": "Medicare",
    "subtypes": [
        {
            "name": "Medicare A",
            "payor-id": "3003",
            "subitems": []
        },
        {
            "name": "Medicare B",
            "payor-id": "3004",
            "subitems": []
        }

    ]
};
 
var Private = 
{
    "type": "Private",
    "subtypes": [
        {
            "name": "Private",
            "payor-id": "3005",
            "subitems": []
        }
    ]
};

var Veterans =
{
    "type": "Veterans",
    "subtypes": [
        {
            "name": "Veterans",
            "payor-id": "3006",
            "subitems": []
        }
    ]
};
