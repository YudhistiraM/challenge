function makeArray(n){
  let array = [], count = 0;

  for(let i = 0; i < n; i++){
    array[i] = [];
    for(let j = 0; j < n; j++){
      array[i][j] = count;
      count++;
    }
  }
  return array;
}

function spiral(param){
  let array = makeArray(param);
  let x = 0;
  let y = 0;
  let resultLength = param * param;
  let resultArray = [];
  let batasPenambahan = param; batasPengurangan = 0;
  while(true){
    //bergerak ke kanan
    for(; x < batasPenambahan; x++){
      resultArray.push(array[y][x]);
      if(resultArray.length == resultLength){
        return resultArray;
      }
    }
    y++;
    x--;
    //bergerak ke bawah
    for(; y < batasPenambahan; y++){
      resultArray.push(array[y][x]);
      if(resultArray.length == resultLength){
        return resultArray;
      }
    }
    y--;
    x--;
    //bergerak ke kiri
    for(; x >= batasPengurangan; x--){
      resultArray.push(array[y][x]);
      if(resultArray.length == resultLength){
        return resultArray;
      }
    }
    x++;
    y--;
    //bergerak ke atas
    for(; y > batasPengurangan; y--){
      resultArray.push(array[y][x]);
      if(resultArray.length == resultLength){
        return resultArray;
      }
    }
    y++;
    x++;
    batasPenambahan--;
    batasPengurangan++;
  }
}

console.log(spiral(5));
console.log(spiral(6));
console.log(spiral(7));
