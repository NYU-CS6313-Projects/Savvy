var studentDemographics = loadJSON('data/demographics.json');
var gameLog = loadJSON('data/gameLog.json');

var badgeColor = '#1b9e77';
var noBadgeColor = '#d95f02';

var LevelKeys = {};
LevelKeys[1] = 9;
LevelKeys[2] = 7;
LevelKeys[3] = 8;
LevelKeys[4] = 6;

var studentIDS = [];
var scatterplotChart;

var statisticalValue = 'sum';



function initViz()
{
  updateSelectedAttributeStyle('playTime');

  updateScatterplot();
  // updateGameKeyMetrics();
  // updateGameKeyCharts();
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

  var sum = arraySum(attribute);
  var avg = parseFloat((sum/attribute.length).toFixed(2));

  return { 'sum': sum, 'avg': avg, 'max' : arrayMax(attribute), 'min' : arrayMin(attribute), 'array':attribute };
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

        row[attributeName] = attribute[statisticalValue];
        attributeSUM.push(attribute[statisticalValue]);

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

function generateEmptyGroup()
{
  var data = [];

  for (lv = 1; lv < LevelKeys[ch] + 1; lv++)
  {
    var row = {};
    row['Chapter'] = ch;
    row['Level'] = lv;
    data.push(row);
  }

  return data;
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

      row[attributeName] = attribute[statisticalValue];

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
  // console.log("---- running getConditionSummary for: + " + attributeName + "---")
  var badges;
  var noBadges;

  if (data && data.length > 0)
  {
    badges = getCondition('level badges', data);
    noBadges = getCondition('no badges', data);

    if (badges.length == 0)
    {
      // console.log("POPULATING BADGES");
      badges.push('999999');
    }

    if (noBadges.length == 0)
    {
      // console.log("POPULATING NO BADGES");
      noBadges.push('999999');
    }

    // console.log("badges = " + badges);
    // console.log("no badges = " + noBadges);

  }
  else
  {
    badges = getCondition('level badges');
    noBadges = getCondition('no badges');
  }

  var attribute_Badges = getAttribute(attributeName, badges);
  var attribute_NoBadges = getAttribute(attributeName, noBadges);

  var max = Math.max(attribute_Badges[statisticalValue], attribute_NoBadges[statisticalValue]);

  return { 'sum' : [['Badges', attribute_Badges[statisticalValue]], ['No badges', attribute_NoBadges[statisticalValue]]], 'max' : max };
}



function updateSelectedAttribute(attribute)
{
  document.getElementById("chapter-metric-select").value = attribute;

  updateSelectedAttributeStyle(attribute);
  updateAllCharts();
}

function updateSelectedAttributeStyle(attribute) {
  
  var metricKeys = ['playTime', 'playCount', 'steps', 'deaths', 'anglesUnlocked', 'badgesEarned'];

  for (metric in metricKeys) {
    var metricBox = document.getElementById('metric-box-'+metricKeys[metric]);
    metricBox.className = 'metric-box';

    var metricLink = document.getElementById('metric-link-'+metricKeys[metric]);
    metricLink.className = 'metric-link';
  }

  var metricBoxSelected = document.getElementById('metric-box-'+attribute);
  metricBoxSelected.className += ' metric-box-selected';

  var metricLinkSelected = document.getElementById('metric-link-'+attribute);
  metricLinkSelected.className += ' metric-link-selected';
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

function updateStatisticalValue()
{
  var statValue = document.getElementById("statisticalValue");
  statValueKey = statValue.options[statValue.selectedIndex].value;

  statisticalValue = statValueKey;

  // updateScatterplot();
  updateSelection();
  updateGameSummaryCharts();
}
