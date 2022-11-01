// 応答メッセージURL
const REPLY = "https://api.line.me/v2/bot/message/reply";

// アクセストークン
const ACCESS_TOKEN = "PvIffML2/T1QRBvqQP/idWW7GXQwSuaTOhmJhGPk7/5QW5klaWNBX2vFPD0IwvNVAM+vzMuK+0FXOFzXfqQpjnZi1KorvCCFr0+41HSFdgxmNaz+74M5+VlodgCZke2JlLtE5fTtBP1Q5l5bZtEbVQdB04t89/1O/w1cDnyilFU=";

// スプレッドシート情報
const SHEET_ID = '1U1TVQ81Ipd7HbA9T4kjiartZF0pxKgFx5D3dfYgXTwk';
const sheet_data = SpreadsheetApp.openById(SHEET_ID).getSheetByName("DB");
const sheet_shosai = SpreadsheetApp.openById(SHEET_ID).getSheetByName("shosai");
const sheet_debug = SpreadsheetApp.openById(SHEET_ID).getSheetByName("debug");



function doPost(e) {

  //ラインから受け取った情報を格納している
  let data = JSON.parse(e.postData.contents);

  //obj(data)のデータを取り出しているだけ
  let messageType = data.events[0].type
  let replyToken = data.events[0].replyToken;
  let useridname = data.events[0].source.userId;
  let timestampda = data.events[0].timestamp;

  //chatlog
  sheet_debug.appendRow([data.events[0]]);


  //メッセージタイプで判定を行う
  if (messageType == "message") {
    let textMessage = data.events[0].message.text
    if (data.events[0].message.text == "観光地を探す") {
      sheet_data.appendRow([timestampda, useridname, textMessage])
      sendMessage(replyToken)
    }
  }
  if (messageType == "postback") {
    if (ssRef(0) == "観光地を探す") {
      let postbackdata = data.events[0].postback.data;
      sheet_data.appendRow([timestampda, useridname, postbackdata])
      sendMessage(replyToken)
    } else if (ssRef(1) == "観光地を探す") {
      let postbackdata = data.events[0].postback.data;
      sheet_data.appendRow([timestampda, useridname, postbackdata])
      sendMessage(replyToken)
    } else if (ssRef(2) == "観光地を探す") {
      let postbackdata = data.events[0].postback.data;
      sheet_data.appendRow([timestampda, useridname, postbackdata])
      //最適化された観光地を表示
      sendKankoMessage(replyToken);
    }
  }

}

//択一式の質問を送信
function sendMessage(replyToken) {

  //値を格納　0:Title 1:一つ目の質問　2:2つ目・・・
  //textarrayに質問文を格納している
  let textarray = [questionText()]


  let seasonQuestion = [
    {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://uetyama1173.github.io/Line-develop-GAS/img/age2.jpg",
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
              "text": textarray[0][0],
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
                "label": textarray[0][1],
                "data": "1",
                "displayText": textarray[0][1]
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": textarray[0][2],
                "data": "2",
                "displayText": textarray[0][2]
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
                "label": textarray[0][3],
                "data": "3",
                "displayText": textarray[0][3]
              }
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": textarray[0][4],
                "data": "4",
                "displayText": textarray[0][4]
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
    "messages": seasonQuestion
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
function sendKankoMessage(replyToken) {

  const kankochi = cosRuiji()

  let touristArea1 = kankochi[0][0]
  let touristArea2 = kankochi[1][0]
  let touristArea3 = kankochi[2][0]


  let kankochiAnswer = [

    {
      "type": "template",
      "altText": "this is a carousel template",
      "template": {
        "type": "carousel",
        "columns": [
          {
            "thumbnailImageUrl": touristArea1.imgUrl,
            "title": touristArea1.land,
            "text": touristArea1.detailText,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": `https://script.google.com/a/macros/style-arts.jp/s/AKfycbzYZ2-Ez4DexD1PDDAM6pDuvPtcbDpPpqOLSL70FUlH-C80FA7p3gf_0v1LeRxxbE4A/exec?id=${touristArea1.id}`
              }
            ]
          },
          {
            "thumbnailImageUrl": touristArea2.imgUrl,
            "title": touristArea2.land,
            "text": touristArea2.detailText,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": `https://script.google.com/a/macros/style-arts.jp/s/AKfycbzYZ2-Ez4DexD1PDDAM6pDuvPtcbDpPpqOLSL70FUlH-C80FA7p3gf_0v1LeRxxbE4A/exec?id=${touristArea2.id}`
              }
            ]
          },
          {
            "thumbnailImageUrl": touristArea3.imgUrl,
            "title": touristArea3.land,
            "text": touristArea3.detailText,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": `https://script.google.com/a/macros/style-arts.jp/s/AKfycbzYZ2-Ez4DexD1PDDAM6pDuvPtcbDpPpqOLSL70FUlH-C80FA7p3gf_0v1LeRxxbE4A/exec?id=${touristArea3.id}`
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


