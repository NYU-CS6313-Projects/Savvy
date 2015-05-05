var gameLog = loadJSON('data/gameLog.json');


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

function getStudentsForCondition(condition, data)
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



// function getAttributeSUM(attribute, data)
// {
//   attributeSUM = [];

//   if (data)
//   {
//     for (student in data)
//     {
//       if (data[student].subjectCond == condition)
//       {
//         studentData.push(data[student]);
//       }
//     }
//   }
//   else
//   {
//     for (student in gameLog)
//     {
//       if (gameLog[student].subjectCond == condition)
//       {
//         studentData.push(gameLog[student]);
//       }
//     }
//   }

//   return attributeSUM;
// }



