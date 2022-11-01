function doGet(e) {
//e(eじゃなくても良い)で URLのparameter取得
//eの中にparameterをidという変数を格納
  id = e.parameter.id

  numrow = sheet_shosai.getLastRow()
  numcolums = sheet_shosai.getLastColumn()
  sheetdata = sheet_shosai.getSheetValues(2, 1, numrow - 1, numcolums)

  //sheetdataの0番目はどうなっている？
  //data = sheetdata[id-1]

  data = sheetdata.filter((d) => {
    return d[0] === Number(id)
  })[0]

  land = data[1]
  imageurl = data[3]
  address = data[4]
  outline = data[5]
  eigyojikan = data[6]
  closedday = data[7]
  officiallink = data[8]

  return HtmlService.createTemplateFromFile('index').evaluate();

}