function cosRuiji() {

  //SSから質問の回答を参照
  let personality = [ssRef(2), ssRef(1), ssRef(0)]

  //最終行の取得
  let lastrow = sheet_shosai.getLastRow();

  let list = []

  //cos類似度計算
  for (let i = 2; i < lastrow + 1; i++) {

    //SSで観光地のパラメータ値を取得
    let ans1 = sheet_shosai.getRange(i, 10).getValue()
    let ans2 = sheet_shosai.getRange(i, 11).getValue()
    let ans3 = sheet_shosai.getRange(i, 12).getValue()

    //SSから観光地情報を取得
    let id = sheet_shosai.getRange(i, 1).getValue()
    let land = sheet_shosai.getRange(i, 2).getValue()
    let imgUrl = sheet_shosai.getRange(i, 4).getValue()
    let detailText = sheet_shosai.getRange(i, 3).getValue()
    let address = sheet_shosai.getRange(i, 5).getValue()


    //cos類似度計算
    const bunshi = (ans1 * personality[0] + ans2 * personality[1] + ans3 * personality[2])
    const bunbo = Math.sqrt((ans1 ** 2 + ans2 ** 2 + ans3 ** 2) * (personality[0] ** 2 + personality[1] ** 2 + personality[2] ** 2))
    cosRuiji = [{id:id, land: land, imgUrl: imgUrl, detailText: detailText, address: address, ruijido: bunshi/bunbo}]

    //配列を追加している
    list.push(cosRuiji)

  }
  
  //sort　昇順
  list.sort(function (a, b) {
  return a[0].ruijido - b[0].ruijido;
});


  //要素を取り出す
  let max1 = list.pop()
  let max2 = list.pop()
  let max3 = list.pop()


  //最適化された観光地の空配列を生成する
  let bestland = [max1, max2, max3]

  return bestland

}






