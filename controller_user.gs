/**
 * ユーザーを判定する関数
 * @param {number}useridname - LINEから送信されたユーザーID情報
 * @return {number}result - ユーザの行数
 */
function userJudge(useridname) {

  //最終行を取得
  let lastdata = sheet_user.getLastRow()

  //A列のuseridnameを探索
  //0 ~ lastdata(3)
  let array = []
  for (let i = 0; i < lastdata - 1; ++i) {
    let useridname_getValue = sheet_user.getRange(i + 2, 1).getValue()
    array.push(useridname_getValue)
  }

  //ID判定
  //もし、送信先のIDとスプシのusertableにuseridnameが一致していれば
  let result = array.indexOf(useridname) 

  if (result == -1) {
    //最終行にユーザーIDを追加
    sheet_user.appendRow([useridname]);
  }

  //Userの行数を返しているだけ
  return result + 2

}


/**
 * ユーザの回答を判定する関数
 * @param {number}userNum - 行
 * @param {number}num - 列
 * @return {number}refUser -　参照した値(質問の回答)
 */
function ssRef(userNum,num) {

  //判定
  let refUser = sheet_user.getRange(userNum , 2 + num).getValue()
  return refUser

}

/**
 * ユーザに対応する質問列をSSへ記述する関数
 * @param {number}userNum - 行
 * @param {number}num - 列
 * @param {string}data - ポストバックの値
 * @return {number}personal_data -　回答した値(質問の回答)
 */
function ssWrite(userNum,num,data) {
  //判定
  let personal_data = sheet_user.getRange(userNum ,num).setValue(data)
  return personal_data

}



