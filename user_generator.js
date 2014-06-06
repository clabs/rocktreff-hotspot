var bases = require( 'bases' )
var crypto = require( 'crypto' )

function generate_token ( length ) {
	length = length || 8
	var maxNum = Math.pow( 62, length )
	var numBytes = Math.ceil( Math.log( maxNum ) / Math.log( 256 ) )
	var bytes, num, i
	do {
		bytes = crypto.randomBytes( numBytes )
		num = 0
		for ( i = 0; i < bytes.length; i += 1)
			num += Math.pow( 256, i ) * bytes[ i ]
	} while ( num >= maxNum )
	return bases.toBase62( num )
}



var used_tokens = {}
function generate_usercmd ( num, profile ) {
	for ( var i = 0; i < num; true ) {
		var token = 'RT' + generate_token( 4 )
		if ( used_tokens[ token ] ) {
			continue
		} else {
			used_tokens[ token ] = profile
		}
		var cmd = '/ip hotspot user add profile="'+profile+'" server="Rocktreff Hotspot" name="'+token+'" password="rocktreff"'
		console.log( cmd )
		i += 1
	}
}



generate_usercmd(  100, 'Rocktreff Bands' )
generate_usercmd(  100, 'Rocktreff MA' )


for ( var token in used_tokens ) {
	console.log( token + ',' + used_tokens[ token ] )
}
