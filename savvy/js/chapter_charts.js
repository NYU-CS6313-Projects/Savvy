function updateChapterGraphs(chapterAttributeKey, chapterAttributeName)
{

  // for (var i = 1; i < 5; i++){
    i = 1;
    // data = 
    //   [{"subjectId":3001,"subjectCond":"level badges","chapter":1,"level":1,"playCount":1,"playTime":8,"deaths":0,"badgesEarned":"0","anglesUnlocked":0,"steps":1,"badgeDecision":"NULL"},
    //    {"subjectId":3001,"subjectCond":"level badges","chapter":1,"level":1,"playCount":1,"playTime":9,"deaths":0,"badgesEarned":"0","anglesUnlocked":0,"steps":2,"badgeDecision":"NULL"},{"subjectId":3001,"subjectCond":"level badges","chapter":1,"level":3,"playCount":1,"playTime":13,"deaths":0,"badgesEarned":"0","anglesUnlocked":0,"steps":5,"badgeDecision":"NULL"},{"subjectId":3001,"subjectCond":"level badges","chapter":1,"level":4,"playCount":1,"playTime":14,"deaths":0,"badgesEarned":"0","anglesUnlocked":1,"steps":3,"badgeDecision":"NULL"}];
    // data = getChapters(3);
    // if (){
      

      

      // data = getStudentsForCondition("no badges", getChapters(3));
    
      // var cChart = c3.generate({
      //       bindto: '.chapter1-chart',
      //       data: {
      //         json: data,
      //         type: 'bar',
      //         keys: {
      //             x: 'level',
      //             value: ['steps']
      //         }
      //       },
      //       axis: {
      //         y: {
      //           label: chapterAttributeName,
      //           min: 0,
      //           max: 500,
      //           padding: {top: 0, bottom: 0}
      //         },
      //         x: {
      //           label: {
      //             text: 'Chapter ' + i,
      //             position: 'outer-center'
      //           }
      //         }
      //       },
      //       tooltip: {
      //         show: true,
      //       },
      //       point: {
      //         show: false
      //       },
      //       bar: {
      //         width: 15
      //       },
      //       legend: {
      //         hide: true,

      //       }
      // });
    // }
  // }

}


function updateChapterAttributes(){

  var chapterAttributeSelected = document.getElementById("chapter-metric-select");

  chapterAttributeKey = chapterAttributeSelected.options[chapterAttributeSelected.selectedIndex].value;
  chapterAttributeName = chapterAttributeSelected.options[chapterAttributeSelected.selectedIndex].innerHTML;

  updateChapterGraphs(chapterAttributeKey, chapterAttributeName);

};

