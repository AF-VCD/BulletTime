export function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start, end;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      end = start + matchArr[0].length;
      callback(start, end);
    }
}

export function getMenuOptions(db, key){
  let arg = key.replace(/\s/g, ' ').replace(/'/g, "''").replace(/%/g, "[%]")
  let result = db.exec(
    "SELECT pair_id FROM words WHERE word LIKE '" + arg + "';"
  );
  let pair_id = null;
  let items = [];
  if (result.length) {
    pair_id = result[0].values[0];
    let itemResult = db.exec(
      "SELECT word FROM words WHERE pair_id = " + pair_id + ";"
    )
    if (itemResult.length) {
      items=itemResult[0].values;
    }
  }
  return items;
};
