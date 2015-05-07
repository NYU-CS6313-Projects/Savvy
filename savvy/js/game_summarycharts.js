// Chapter 1 - Level: 1 - 9
// Chapter 2 - Level: 1 - 7
// Chapter 3 - Level: 1 - 8
// Chapter 4 - Level: 1 - 6

// summaryData = [ { 'Chapter': NN, 'Level': NN, '_attributeName': NN } ]


function updateGameSummaryCharts()
{
  var selectedAttribute = getSelectedAttribute();
  var attribute = getAttribute(selectedAttribute.key);

  var max = getAttributeSummary(selectedAttribute.key).max;

  for (ch = 1; ch < 5; ch++) {
    var data = getAttributeSummaryForChapter(selectedAttribute.key, ch);

    var chart = c3.generate({
          bindto: '.totalset-chapter'+ch+'-chart',
          data: {
            json: data,
            type: 'bar',
            keys: {
                x: 'Level',
                value: [selectedAttribute.key]
            }
          },
          axis: {
            y: {
              label: selectedAttribute.name,
              max: max
            },
            x: {
              label: {
                text: 'Chapter ' + ch,
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
}