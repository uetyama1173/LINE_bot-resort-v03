function ssRef(num){

  //最終行を取得
  let lastdata = sheet_data.getLastRow()　- `${num}`;
 
  //判定
  let refSeason = sheet_data.getRange(lastdata,3).getValue()


  return refSeason

}


