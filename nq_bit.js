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

var nqBit = function(n){ 
 
  var all = 2*n-1; 
  
  var accum = 0; 
  
  var innerBit = function(ld, col, rd, cnt) { 
    if( cnt >= n ) { 
      accum++; 
      return; 
    } 
    // poss is short for possibilities
    var poss = ~(ld | cols | rd ) & all; 
    while(poss){ 
      var nextPoss = poss & -poss;
      poss -= nextPoss      
      innerBit( (ld|nextPoss)<<1, cols|nextPoss, (rd|nextPoss)>>1, cnt+1); 
    } 
  }; 

  // kick of innerBit
  var rd = 0; 
  var cols = 0; 
  var ld = 0; 
  innerBit(rd, cols, ld, 0);
  return accum; 
} 

var res = nqBit(4); 
console.log(res); 
  