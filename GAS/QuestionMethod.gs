function questionText() {

/* 重複チェックメソッド　 */

  var randoms = [];
  
  //numを取り出す 質問ID
  let lastdata = sheet_data.getLastRow()
  let num = sheet_data.getRange(lastdata,4).getValue
  let num2 = sheet_data.getRange(lastdata-2,4).getValue()


  var min = 0, max = 7;
  random = Math.floor(Math.random() * (max - min + 1)) + min;

　//num以外の数を返す
  while (true) {
    var tmp = random
    if (num != tmp && num2 != tmp) {
      randoms.push(tmp);
      break;
    }else{
      randoms.push(tmp);
      break;
    }
  }

  let randomMethod = randoms[0]

/* ここまで　*/


  let questionTitle = ["年齢はいくつですか？", "誰と行きますか？", "お気に入りの場所はどこですか？", "インドアorアウトドア派？", "好きな音楽のジャンルは？", "お酒は飲みますか？", "今日はどんな気分？", "この中でやりたいことは？"]
  let answer1 = ["20代", "一人旅", "グルメ・カフェ", "アウトドア!", "JPOP", "大好き", "レジャーでリフレッシュ", "カジノでスリルを味わう"]
  let answer2 = ["30~40代", "夫婦・カップル", "博物館・美術館", "ややアウトドア", "洋楽", "好き", "自然に触れてリラックス", "リゾートでゆったりとバカンス"]
  let answer3 = ["50~60代", "友達", "穴場", "ややインドア", "アニソン", "あまり好きじゃない", "友達とグルメ", "エジプトやマチュピチュへ行って不思議な体験をしたい"]
  let answer4 = ["60代以上", "団体", "外", "インドア！", "演歌", "嫌い", "未知の体験・・・", "南極やアマゾンへ行って冒険をやりたい"]
  
  // return [questionTitle[randomMethod], answer1[randomMethod], answer2[randomMethod], answer3[randomMethod], answer4[randomMethod]]
 //obj で括る

  if (randomMethod == 0) {
    sheet_data.getRange(lastdata,4).setValue(randomMethod)
    return [questionTitle[randomMethod], answer1[randomMethod], answer2[randomMethod], answer3[randomMethod], answer4[randomMethod]]
  } else if (randomMethod == 1) {
    sheet_data.getRange(lastdata,4).setValue(randomMethod)
    return [questionTitle[randomMethod], answer1[randomMethod], answer2[randomMethod], answer3[randomMethod], answer4[randomMethod]]
  } else if (randomMethod == 2) {
    sheet_data.getRange(lastdata,4).setValue(randomMethod)
    return [questionTitle[randomMethod], answer1[randomMethod], answer2[randomMethod], answer3[randomMethod], answer4[randomMethod]]
  } else if (randomMethod == 3) {
    sheet_data.getRange(lastdata,4).setValue(randomMethod)
    return [questionTitle[randomMethod], answer1[randomMethod], answer2[randomMethod], answer3[randomMethod], answer4[randomMethod]]
  } else if (randomMethod == 4) {
    sheet_data.getRange(lastdata,4).setValue(randomMethod)
    return [questionTitle[randomMethod], answer1[randomMethod], answer2[randomMethod], answer3[randomMethod], answer4[randomMethod]]
  } else if (randomMethod == 5) {
    sheet_data.getRange(lastdata,4).setValue(randomMethod)
    return [questionTitle[randomMethod], answer1[randomMethod], answer2[randomMethod], answer3[randomMethod], answer4[randomMethod]]
  } else if (randomMethod == 6) {
    sheet_data.getRange(lastdata,4).setValue(randomMethod)
    return [questionTitle[randomMethod], answer1[randomMethod], answer2[randomMethod], answer3[randomMethod], answer4[randomMethod]]
  } else if (randomMethod == 7) {
    sheet_data.getRange(lastdata,4).setValue(randomMethod)
    return [questionTitle[randomMethod], answer1[randomMethod], answer2[randomMethod], answer3[randomMethod], answer4[randomMethod]]
  }

}


