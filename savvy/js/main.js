var studentDemographics = loadJSON('data/demographics.json');
var gameLog = loadJSON('data/gameLog.json');

var LevelKeys = {};
LevelKeys[1] = 9;
LevelKeys[2] = 7;
LevelKeys[3] = 8;
LevelKeys[4] = 6;




function initViz()
{
  updateScatterplot();
  updateGameKeyMetrics();
  updateGameKeyCharts();
  updateAllCharts();
}

function updateAllCharts()
{
  updateGroupSummaryCharts();
  updateGameSummaryCharts();
}

/****** DATA LOADING ******/

function loadJSON(filePath) {
  // Load json file;
  var json = loadTextFileAjaxSync(filePath, "application/json");
  // Parse json
  return JSON.parse(json);
}   

function loadTextFileAjaxSync(filePath, mimeType)
{
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET",filePath,false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  if (xmlhttp.status==200)
  {
    return xmlhttp.responseText;
  }
  else {
    // TODO Throw exception
    return null;
  }
}



/****** UTILITIES ******/

function arrayMin(arr) {
  var len = arr.length, min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
};

function arrayMax(arr) {
  var len = arr.length, max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
};

function arraySum(arr) {
   var sum = 0;
   for(var i=0; i < arr.length; i++) 
   { 
      sum += parseFloat(arr[i]); 
   }
   return sum;
};



/****** DATA QUERY ******/

function getStudentsWithID(studentIDs)
{
  studentData = [];

  if (studentIDs) {
    for (studentID in studentIDs) {

      for (student in gameLog)
      {
        if (gameLog[student].subjectId == studentIDs[studentID])
        {
          studentData.push(gameLog[student]);
        }
      }
    }
  }
  else
  {
      for (student in gameLog)
      {
          studentData.push(gameLog[student]);
      }
  }

  return studentData;
}


function getChapter(chapterNumber, data)
{
  studentData = [];

  if (data && data.length > 0) {
    for (student in data)
    {
      if (data[student].chapter == chapterNumber)
      {
        studentData.push(data[student]);
      }
    }
  }
  else
  {
    for (student in gameLog)
    {
      if (gameLog[student].chapter == chapterNumber)
      {
        studentData.push(gameLog[student]);
      }
    }
  }

  return studentData;
}


function getLevel(levelNumber, data)
{
  studentData = [];

  if (data && data.length > 0) {
    for (student in data)
    {
      if (data[student].level == levelNumber)
      {
        studentData.push(data[student]);
      }
    }
  }
  else
  {
    for (student in gameLog)
    {
      if (gameLog[student].level == levelNumber)
      {
        studentData.push(gameLog[student]);
      }
    }
  }

  return studentData;
}


function getAttribute(attributeName, data)
{
  attribute = [];

  if (data && data.length > 0)
  {
    for (student in data)
    {
      attribute.push((data[student][attributeName]));
    }
  }
  else
  {
    for (student in gameLog)
    {
      attribute.push((gameLog[student][attributeName]));
    }
  }

  return { 'sum': arraySum(attribute), 'max' : arrayMax(attribute), 'min' : arrayMin(attribute), 'array':attribute };
}


function getAttributeSummary(attributeName, data)
{

  var summaryData = [];
  var attributeSUM = [];

  for (ch = 1; ch < 5; ch++)
  {

    var chapterData = getChapter(ch, data);

    for (lv = 1; lv < LevelKeys[ch] + 1; lv++)
    {
      
      var row = {};
      row['Chapter'] = ch;
      row['Level'] = lv;

      var levelData = getLevel(lv, chapterData);

      if ((chapterData && chapterData.length > 0) && (levelData && levelData.length > 0)) {

        var attribute = getAttribute(attributeName, levelData);

        row[attributeName] = attribute.sum;
        attributeSUM.push(attribute.sum);

      }
      else
      {
        row[attributeName] = 0;
      }
      

      summaryData.push(row);
      
    }
  }

  return { 'data' : summaryData, 'max' : arrayMax(attributeSUM) };

}


function getAttributeSummaryForChapter(attributeName, ch, data)
{

  var summaryData = [];

  var chapterData = getChapter(ch, data);

  for (lv = 1; lv < LevelKeys[ch] + 1; lv++)
  {
    
    var row = {};
    row['Chapter'] = ch;
    row['Level'] = lv;

    var levelData = getLevel(lv, chapterData);

    if ((chapterData && chapterData.length > 0) && (levelData && levelData.length > 0)) {

      var attribute = getAttribute(attributeName, levelData);

      row[attributeName] = attribute.sum;

    }
    else
    {
      row[attributeName] = 0;
    }
    

    summaryData.push(row);
    
  }

  return summaryData;

}


// * Conditions (subjectCond):
//   - "level badges"
//   - "no badges"

function getCondition(condition, data)
{
  studentData = [];

  if (data && data.length > 0)
  {
    for (student in data)
    {
      if (data[student].subjectCond == condition)
      {
        studentData.push(data[student]);
      }
    }
  }
  else
  {
    for (student in gameLog)
    {
      if (gameLog[student].subjectCond == condition)
      {
        studentData.push(gameLog[student]);
      }
    }
  }

  return studentData;
}



function getConditionSummary(attributeName, data)
{
  var badges;
  var noBadges;

  if (data && data.length > 0)
  {
    badges = getCondition('level badges', data);
    noBadges = getCondition('no badges', data);
  }
  else
  {
    badges = getCondition('level badges');
    noBadges = getCondition('no badges');
  }

  var attribute_Badges = getAttribute(attributeName, badges);
  var attribute_NoBadges = getAttribute(attributeName, noBadges);

  var max = Math.max(attribute_Badges.sum, attribute_NoBadges.sum);

  return { 'values' : [['Badges', attribute_Badges.sum], ['No badges', attribute_NoBadges.sum]], 'max' : max };
}



function updateSelectedAttribute(attribute)
{
  document.getElementById("chapter-metric-select").value = attribute;
  updateAllCharts();
}

function getSelectedAttribute()
{
  var chapterAttributeSelected = document.getElementById("chapter-metric-select");

  chapterAttributeKey = chapterAttributeSelected.options[chapterAttributeSelected.selectedIndex].value;
  chapterAttributeName = chapterAttributeSelected.options[chapterAttributeSelected.selectedIndex].innerHTML;

  return {'key' : chapterAttributeKey, 'name' : chapterAttributeName}
}



function getScatterplotAxes()
{
  var xAxis = document.getElementById("scatterplot-xAxis");
  var yAxis = document.getElementById("scatterplot-yAxis");

  xAxisKey = xAxis.options[xAxis.selectedIndex].value;
  xAxisName = xAxis.options[xAxis.selectedIndex].innerHTML;  

  yAxisKey = yAxis.options[yAxis.selectedIndex].value;
  yAxisName = yAxis.options[yAxis.selectedIndex].innerHTML;

  return {'xKey' : xAxisKey, 'xName' : xAxisName, 'yKey' : yAxisKey, 'yName' : yAxisName}
}

