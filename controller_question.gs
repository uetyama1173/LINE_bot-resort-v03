/**
 * 質問objの取得とuserシートに書き込みを行う関数
 * @param {number}usernum - LINEから送信されたユーザーID情報
 * @paream{number}row - ユーザーの質問IDが含まれる列
 * @paream{number}q2_row - ユーザーの質問IDが含まれる列
 * @return{number}random - 質問ID
 */
function outQuestion_ID(usernum, row, q2_row) {

  //質問数取得
  let lastdata = sheet_user.getLastRow()

  //ユーザの質問IDを取得 
  let hasAnswered = sheet_user.getRange(usernum, row, 1, q2_row).getValues()

  //2行目から最終行
  var min = 1, max = lastdata;

  while (true) {
    var question_ID = Math.floor(Math.random() * (max + 1 - min)) + min;
    if (question_ID != hasAnswered[0][0] && question_ID != hasAnswered[0][1]) {
      question_ID
      break
    }
  }

  //userシートに書き込み 
  sheet_user.getRange(usernum, q2_row).setValue(question_ID)


  //質問文をセット
  // 後日、実装　let question_img = 
  //質問内容
  // let question_content = sheet_user.getRange(question_ID + 1, 2).getValue()
  // let question_ans_first = sheet_user.getRange(question_ID + 1, 3).getValue()
  // let question_ans_second = sheet_user.getRange(question_ID + 1, 4).getValue()
  // let question_ans_third = sheet_user.getRange(question_ID + 1, 5).getValue()
  // let question_ans_force = sheet_user.getRange(question_ID + 1, 6).getValue()

  return question_ID


}



/**
 * cos類似度計算アルゴリズム
 * @param {number}usernum - LINEから送信されたユーザーID情報
 * @return{number}result - 最適化された観光地ID
 */
function cosRuiji(usernum) {

  //ユーザの質問回答
  let ans_user1 = sheet_user.getRange(usernum, 2).getValue()
  let ans_user2 = sheet_user.getRange(usernum, 3).getValue()
  let ans_user3 = sheet_user.getRange(usernum, 4).getValue()

  //観光スポット数
  let place_kanko_total = sheet_shosai.getLastRow()

  let list = []

  //cos類似度計算
  for (let i = 2; i < place_kanko_total; i++) {

    //SSで観光地のパラメータ値を取得
    let ans1 = sheet_shosai.getRange(i, 10).getValue()
    let ans2 = sheet_shosai.getRange(i, 11).getValue()
    let ans3 = sheet_shosai.getRange(i, 12).getValue()

    //SSから観光地情報を取得
    let id = sheet_shosai.getRange(i, 1).getValue()
    let land_name = sheet_shosai.getRange(i, 2).getValue()
    let imgUrl = sheet_shosai.getRange(i, 4).getValue()
    let detailText = sheet_shosai.getRange(i, 3).getValue()
    let address = sheet_shosai.getRange(i, 5).getValue()
    let businessday = sheet_shosai.getRange(i, 7).getValue()
    let land_outline = sheet_shosai.getRange(i, 6).getValue()
    let closed_day = sheet_shosai.getRange(i, 8).getValue()
    let officiallink = sheet_shosai.getRange(i, 9).getValue()

    //詳細ページで用いる(エンコード処理)
    let land_name_encode = encodeURI(land_name)
    let land_outline_encode = encodeURI(land_outline)
    let address_encode = encodeURI(address)
    let closed_day_encode = encodeURI(closed_day)
    let businessday_encode = encodeURI(businessday)






    //cos類似度計算
    const bunshi = (ans1 * ans_user1 + ans2 * ans_user2 + ans3 * ans_user3)
    const bunbo = Math.sqrt((ans1 ** 2 + ans2 ** 2 + ans3 ** 2) * (ans_user1 ** 2 + ans_user2 ** 2 + ans_user3 ** 2))
    cosRuiji = [{ id: id, land_name: land_name, img_url: imgUrl, detailText: detailText, address: address, ruijido: bunshi / bunbo, land_name_encode: land_name_encode,land_outline_encode: land_outline_encode, businessday_encode: businessday_encode, closed_day_encode: closed_day_encode, address_encode: address_encode, officiallink: officiallink }]


    // 配列を追加している
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




