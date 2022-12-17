// 応答メッセージURL
const REPLY = "https://api.line.me/v2/bot/message/reply";

// LINE アクセストークン
const ACCESS_TOKEN = "PvIffML2/T1QRBvqQP/idWW7GXQwSuaTOhmJhGPk7/5QW5klaWNBX2vFPD0IwvNVAM+vzMuK+0FXOFzXfqQpjnZi1KorvCCFr0+41HSFdgxmNaz+74M5+VlodgCZke2JlLtE5fTtBP1Q5l5bZtEbVQdB04t89/1O/w1cDnyilFU=";

// スプレッドシート情報
const SHEET_ID = '1U1TVQ81Ipd7HbA9T4kjiartZF0pxKgFx5D3dfYgXTwk';
const sheet_data = SpreadsheetApp.openById(SHEET_ID).getSheetByName("DB");
const sheet_shosai = SpreadsheetApp.openById(SHEET_ID).getSheetByName("shosai");
const sheet_debug = SpreadsheetApp.openById(SHEET_ID).getSheetByName("debug");
const sheet_user = SpreadsheetApp.openById(SHEET_ID).getSheetByName("user");
const sheet_question = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Question_content");

// function test() {
//   const e = {
//     postData: { source:{ type:"user", userId:"U1dcd5c5fa46a5164aec2c94f8efb8b36" }, deliveryContext:{ isRedelivery:false}, replyToken:"b761913792f54083a992ecccebcc2246", type:"postback", postback:{ data:active }, mode:"active", webhookEventId:"01GKX17745YSPXH3QMEXD3A6X6", timestamp:1.6706428996E12 }
//   }

//   doPost(e)
//}
function doPost(e) {

  //ラインから受け取った情報を格納している
  let data = JSON.parse(e.postData.contents);
  let messageType = data.events[0].type
  let replyToken = data.events[0].replyToken;
  let useridname = data.events[0].source.userId;

  //chatlog
  sheet_debug.appendRow([data.events[0]]);


  //User判定 行数を返す
  let UserJudge = userJudge(useridname)

  //MessageTypeで判定
  if (messageType == "message") {
    if (data.events[0].message.text == "観光地を探す") {
      //質問IDの取得
      let question_ID = outQuestion_ID(UserJudge, 5, 5)
      //1つ目の質問を送信
      sendMessage(replyToken, question_ID)
    }
  }
  else if (messageType == "postback") {
    if (ssRef(UserJudge, 0) == "") {
      //ポストバックデータ
      let postbackdata = data.events[0].postback.data;
      //質問IDの取得
      let question_ID = outQuestion_ID(UserJudge, 5, 6)
      //ユーザの回答(param)
      ssWrite(UserJudge, 2, postbackdata)
      //2つ目の質問を送信
      sendMessage(replyToken, question_ID)
    }
    else if (ssRef(UserJudge, 1) == "") {
      //ポストバックデータ
      let postbackdata = data.events[0].postback.data;
      //質問IDの取得
      let question_ID = outQuestion_ID(UserJudge, 5, 7)
      //ユーザの回答(param)
      ssWrite(UserJudge, 3, postbackdata)
      //3つ目の質問を送信
      sendMessage(replyToken, question_ID)
    }
    else if (ssRef(UserJudge, 2) == "") {
      //ポストバックデータ
      let postbackdata = data.events[0].postback.data;
      //ユーザの回答(param)
      ssWrite(UserJudge, 4, postbackdata)
      //cos類似計算
      let best_place = cosRuiji(UserJudge)

      //データ削除
      sheet_user.getRange(UserJudge, 2, 1, 6).clearContent()
      //最適な観光スポットの検出 
      sendKankoMessage(replyToken, best_place)

    }
  }
}

function sendMessage(replyToken, question_ID) {


  let question_content = sheet_question.getRange(question_ID + 1, 2).getValue()
  let question_ans_first = sheet_question.getRange(question_ID + 1, 3).getValue()
  let question_ans_second = sheet_question.getRange(question_ID + 1, 4).getValue()
  let question_ans_third = sheet_question.getRange(question_ID + 1, 5).getValue()
  let question_ans_force = sheet_question.getRange(question_ID + 1, 6).getValue()
  let question_ans_img_url = sheet_question.getRange(question_ID + 1, 7).getValue()




  let styleQuestion = [
    {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": `${question_ans_img_url}`,
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": `${question_content}`,
              "weight": "bold",
              "size": "xl",
              "margin": "none",
              "align": "center"
            },
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": []
            }
          ],
          "borderColor": "#696969",
          "cornerRadius": "30px"
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": `${question_ans_first}`,
                "data": "1",
                "displayText": `${question_ans_first}`
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": `${question_ans_second}`,
                "data": "2",
                "displayText": `${question_ans_second}`
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "margin": "sm"
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": `${question_ans_third}`,
                "data": "3",
                "displayText": `${question_ans_third}`
              }
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": `${question_ans_force}`,
                "data": "4",
                "displayText": `${question_ans_force}`
              }
            }
          ],
          "flex": 0
        }
      }

    }
  ]


  let postData = {
    "replyToken": replyToken,
    "messages": styleQuestion
  };

  // リクエストヘッダ
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + ACCESS_TOKEN
  };
  // POSTオプション作成
  var options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  return UrlFetchApp.fetch(REPLY, options);


}

//最適化された観光スポットデータを送信
function sendKankoMessage(replyToken, best_place) {

  let kankochiAnswer = [

    {
      "type": "template",
      "altText": "this is a carousel template",
      "template": {
        "type": "carousel",
        "columns": [
          {
            "thumbnailImageUrl": best_place[0][0].img_url,
            "title": best_place[0][0].land_name,
            "text": best_place[0][0].detailText,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": `https://uetyama1173.github.io/test_resorTech_HTML/index_template.html?img_url=${best_place[0][0].img_url}&land_name=${best_place[0][0].land_name_encode}&address=${best_place[0][0].address_encode}&closed_day=${best_place[0][0].closed_day_encode}&officiallink=${best_place[0][0].officiallink}&businessday=${best_place[0][0].businessday_encode}`
              }
            ]
          },
          {
            "thumbnailImageUrl": best_place[1][0].img_url,
            "title": best_place[1][0].land_name,
            "text": best_place[1][0].detailText,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": `https://uetyama1173.github.io/test_resorTech_HTML/index_template.html?img_url=${best_place[1][0].img_url}&land_name=${best_place[1][0].land_name_encode}&address=${best_place[1][0].address_encode}&closed_day=${best_place[1][0].closed_day_encode}&officiallink=${best_place[1][0].officiallink}&businessday=${best_place[1][0].businessday_encode}`
              }
            ]
          },
          {
            "thumbnailImageUrl": best_place[2][0].img_url,
            "title": best_place[2][0].land_name,
            "text": best_place[2][0].detailText,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": `https://uetyama1173.github.io/test_resorTech_HTML/index_template.html?img_url=${best_place[2][0].img_url}&land_name=${best_place[2][0].land_name_encode}&address=${best_place[2][0].address_encode}&closed_day=${best_place[2][0].closed_day_encode}&officiallink=${best_place[2][0].officiallink}&businessday=${best_place[2][0].businessday_encode}`
              }
            ]
          }
        ]
      }
    }


  ]

  let postData = {
    "replyToken": replyToken,
    "messages": kankochiAnswer
  };

  // リクエストヘッダ
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + ACCESS_TOKEN
  };
  // POSTオプション作成
  var options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  return UrlFetchApp.fetch(REPLY, options);

}

