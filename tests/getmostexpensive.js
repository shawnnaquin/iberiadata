
var obj = require('../save.json');
Array.max = function( array ){
    return Math.max.apply( Math, array );
};
var all = [];

Object.keys(obj).forEach((key)=> {

	var t = {
		'name': key,
		'price': []
	}

	for( var item in obj[key].items ) {

		for ( var types in obj[key].items[item].subtypes ) {

			for( var subitem in obj[key].items[item].subtypes[types].subitems ) {
				var p = parseFloat( obj[key].items[item].subtypes[types].subitems[subitem].price );
				t.price.push( p );
				t.price = [ Array.max(t.price) ];
			}

		}

	}
	t.price = parseFloat( t.price[0] );
	all.push(t);
});

var highest = {
	'name': null,
	'price': 0.00
};

all.forEach( (item, i ) => {
	if( item.price >= highest.price ) {
		highest.name = item.name;
		highest.price = item.price;
	}
});

console.log( highest );
