  var _dataPath = 'data/studentData.csv';

  d3.csv( _dataPath, function ( d ) {

    var data = d;
    return data;

  }, function( error, data ) {

    if (!error)
    {

      var chart = c3.generate({
        bindto: '.scatterplot-chart',
        data: {
          json: data,
          type: 'scatter',
          keys: {
              x: 'PreGeoSum',
              value: ['PostGeoSum']
          }
        },
        axis: {
          y: {
            label: {
              text: 'Post Knowledge Score',
              position: 'inner-top'
            } 
          },
          x: {
            label: {
              text: 'Pre Knowledge Score',
              position: 'inner-right'
            }
          }
        },
        tooltip: {
          show: true
        },
        point: {
          show: false
        },
        legend: {
          hide: true,

        }
      });

    }
  });