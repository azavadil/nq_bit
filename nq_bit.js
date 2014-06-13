// notes
// The expression (ld | cols | rd) is a bit pattern
// containing ones in all positions that are under attack
// when complemented and masked with all  a bit pattern
// is formed that gives the positions in the current row

var createBinaryString = function(nMask) {
  // nMask must be between -2147483648 and 2147483647
  for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
       nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  return sMask;
};
var cbs = createBinaryString;

var nqBit = function(n){

  var all = Math.pow(2,n)-1;
  var accum = 0;

  var innerBit = function(ld, cols, rd) {
    if( cols === all ) {
      accum++;
      return;
    }
    // poss is short for possibilities
    var poss = ~(ld | cols | rd ) & all;
    while(poss){
      var bit = poss & -poss;
      poss -= bit;
      innerBit( (ld|bit)<<1, (cols|bit), (rd|bit)>>1);
    }
  };

  // kick off innerBit
  innerBit(0,0,0);
  return accum;
};

for(var i = 0; i < 9; i++){
  var res = nqBit(i);
  console.log(res);
};
