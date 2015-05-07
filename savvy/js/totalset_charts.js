// Chapter 1 - Level: 1 - 9
// Chapter 2 - Level: 1 - 7
// Chapter 3 - Level: 1 - 8
// Chapter 4 - Level: 1 - 6

// summaryData = [ { 'Chapter': NN, 'Level': NN, '_attributeName': NN } ]

var LevelKeys = {};
LevelKeys[1] = 9;
LevelKeys[2] = 7;
LevelKeys[3] = 8;
LevelKeys[4] = 6;


function getAttributeSummary(attributeName, data)
{

  var summaryData = [];

  for (ch = 1; ch < 5; ch++)
  {

    var chapterData = getChapter(ch, data);

    for (lv = 1; lv < LevelKeys[ch] + 1; lv++)
    {
      
      var row = {};
      row['chapter'] = ch;
      row['level'] = lv;

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
  }

  return summaryData;

}


  var _dataPath = 'data/ch1Data.csv';

  d3.csv( _dataPath, function ( d ) {

    var data = d;
    return data;

  }, function( error, data ) {

    if (!error)
    {

      var chart = c3.generate({
        bindto: '.totalset-chapter1-chart',
        data: {
          json: data,
          type: 'bar',
          keys: {
              x: 'Level',
              value: ['playTime']
          }
        },
        axis: {
          y: {
            label: 'Playtime',
            max: 120
          },
          x: {
            label: {
              text: 'Chapter 1',
              position: 'outer-center'
            }
          }
        },
        tooltip: {
          show: true
        },
        point: {
          show: false
        },
        bar: {
          width: 15
        },
        legend: {
          hide: true,

        }
      });

    }
  });



  var _dataPath = 'data/ch2Data.csv';

  d3.csv( _dataPath, function ( d ) {

    var data = d;
    return data;

  }, function( error, data ) {

    if (!error)
    {

      var chart = c3.generate({
        bindto: '.totalset-chapter2-chart',
        data: {
          json: data,
          type: 'bar',
          keys: {
              x: 'Level',
              value: ['playTime']
          }
        },
        axis: {
          y: {
            label: 'Playtime',
            max: 120
          },
          x: {
            label: {
              text: 'Chapter 2',
              position: 'outer-center'
            }
          }
        },
        tooltip: {
          show: true
        },
        point: {
          show: false
        },
        bar: {
          width: 15
        },
        legend: {
          hide: true
        }
      });

    }
  });


  var _dataPath = 'data/ch3Data.csv';

  d3.csv( _dataPath, function ( d ) {

    var data = d;
    return data;

  }, function( error, data ) {

    if (!error)
    {

      var chart = c3.generate({
        bindto: '.totalset-chapter3-chart',
        data: {
          json: data,
          type: 'bar',
          keys: {
              x: 'Level',
              value: ['playTime']
          }
        },
        axis: {
          y: {
            label: 'Playtime',
            max: 120
          },
          x: {
            label: {
              text: 'Chapter 3',
              position: 'outer-center'
            }
          }
        },
        tooltip: {
          show: true
        },
        point: {
          show: false
        },
        bar: {
          width: 15
        },
        legend: {
          hide: true
        }
      });

    }
  });


    var _dataPath = 'data/ch4Data.csv';

  d3.csv( _dataPath, function ( d ) {

    var data = d;
    return data;

  }, function( error, data ) {

    if (!error)
    {

      var chart = c3.generate({
        bindto: '.totalset-chapter4-chart',
        data: {
          json: data,
          type: 'bar',
          keys: {
              x: 'Level',
              value: ['playTime']
          }
        },
        axis: {
          y: {
            label: 'Playtime',
            max: 120
          },
          x: {
            label: {
              text: 'Chapter 4',
              position: 'outer-center'
            }
          }
        },
        tooltip: {
          show: true
        },
        point: {
          show: false
        },
        bar: {
          width: 15
        },
        legend: {
          hide: true
        }
      });

    }
  });



