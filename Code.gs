var ssMaster = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1I-OGtQ1bHyLd2XwHJ_4g2hKen61XBRa7kK1iqdgz9jY/edit');
var sourceSheet = ssMaster.getSheetByName('Sheet1');
var outputSheet = ssMaster.getSheetByName('Output');
var DTMreasonsRange = sourceSheet.getRange(2, 1, sourceSheet.getLastRow() - 2, 3);
var DTMreasons = DTMreasonsRange.getValues();
var outputColumnLabels = ["Area", "Reason", "Count"];



function master() {


	var shortListReasons = removeDuplicates(DTMreasons, 2);
	var shortListUnit = removeDuplicates(DTMreasons, 0);
	var outputRange = outputSheet.getRange(1, 1, shortListUnit.length + 2, 3);
	var output = search(DTMreasons, shortListReasons, shortListUnit);
	output.unshift(outputColumnLabels);
	writeToSheet(output);
}

function writeToSheet(array) {
	outputSheet.clear().clearFormats();
	outputSheet.insertRows(1, array.length);
	SpreadsheetApp.flush();
	range = outputSheet.getRange(1, 1, array.length, array[0].length);
	range.setValues(array);
	SpreadsheetApp.flush();
}
function removeDuplicates(data, col) {


	var newData = new Array();

	for (tt in data) {
		var row = data[tt];
		var duplicate = false;
		for (item in newData) {
			if (row[col] == newData[item][col]) {
				duplicate = true;
			}
		}
		if (!duplicate) {
			newData.push(row);
		}
	}
	return newData;
}

function search(data, set1, set2) {
	//assumes set1 and 2 have the same column structure as data
	var outputArray = [];

	for (i in set1) {
		for (h in set2) {
			var output = data.filter(function(item) {
				return item[0] == set2[h][0] && item[2] == set1[i][2]; /// can i use item as a c=varr?
			});
			var length = output.length;
if (length >= 1) {
  var summary = [set2[h][0],set1[i][2], length];
			outputArray.push(summary);
		}
		
		}
	}

	return outputArray;
}
