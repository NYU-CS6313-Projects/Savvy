var gameLog = loadJSON('data/gameLog.json');

/******  SUBCLASSING  ******/
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

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

// * Conditions (subjectCond):
//   - "level badges"
//   - "no badges"

function getCondition(condition, data)
{
  studentData = [];

  if (data)
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


function getChapters(chapterNumber, data)
{
  studentData = [];

  if (data) {
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

  if (data) {
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
      if (gameLog[student].level == chapterNumber)
      {
        studentData.push(gameLog[student]);
      }
    }
  }

  return studentData;
}

// function getAttribute(attributeName, data)
// {
//   attributeValues = [];

//   if (data)
//   {

//   }
//   else
//   {
//     for (student in gameLog)
//     {
//       if (gameLog[student].)
//     }
//   }

//   return attributeValues;
// }

function getAttributeRANGE(attributeName, data)
{
  attributeRANGE = [];

  if (data)
  {
    for (student in data)
    {
      attributeRANGE.push((data[student][attributeName]));
    }
  }
  else
  {
    for (student in gameLog)
    {
      attributeRANGE.push((gameLog[student][attributeName]));
    }
  }

  return { 'max' : arrayMax(attributeRANGE), 'min' : arrayMin(attributeRANGE) };
}


// function getAttributeSUM(attributeName, data)
// {
//   attributeSUM = [];

//   // if (data)
//   // {
//     for (student in gameLog)
//     {
//       // if (data[dataAttribute].subjectCond == condition)
//       // {
//       //   studentData.push(data[student]);
//       // }
//       var row = {};
//       row['chapter'] = gameLog[student].chapter;
//       row['level'] = gameLog[student].level;
//       row[attributeName] = gameLog[student][attributeName];

//       // console.log(gameLog[student].attributeName);

//       attributeSUM.push(row);
//     }
//   // }
//   // else
//   // {
//   //   for (student in gameLog)
//   //   {
//   //     if (gameLog[student].subjectCond == condition)
//   //     {
//   //       studentData.push(gameLog[student]);
//   //     }
//   //   }
//   // }

//   return attributeSUM;
// }


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
