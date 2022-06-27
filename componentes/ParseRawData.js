export default function ParseRawData(rawData) {
  console.log(rawData);
  let objectsArray = [];
  var lines = rawData.split("\n");
  let fields = lines[0].split(",");

  let options = [];
  for (let col = 0; col < fields.length; col++) {
    options.push({ columnField: fields[col], type: "text" });
  }
  // console.log(options);

  for (let row = 1; row < lines.length; row++) {
    let currentLine = lines[row];
    let cells = currentLine.split(",");
    let dict = {};
    for (let col = 0; col < fields.length; col++) {
      dict[fields[col]] = cells[col];
    }
    objectsArray.push(dict);
  }

  // console.log(objectsArray);
  return [fields, objectsArray, options];
}
