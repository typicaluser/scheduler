var WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
var SHIFTS = ['day', 'night', 'prn'];
var MAX_SLOTS = [3, 3, 1]; // persons to work in day, night, prn
var POSITION_COUNT = 4;
var TOTAL_PERSON_FIELD_COUNT = 15;

$(function() {
  function moveToPage(pageName) {
    $('.page').hide();
    $('#' + pageName).show();
  }
  
  function getAllPositionNames() {
    var allPositions = [];
    for (var i = 1; i <= POSITION_COUNT; i++) {
      var positionName = $('#position' + i).val().trim();
      if (positionName) {
        allPositions.push(positionName);
      }
    }
    return allPositions;
  }
  
  function getAllPersonNames() {
    var allNames = [];
    for (var i = 1; i <= TOTAL_PERSON_FIELD_COUNT; i++) {
      var name = $('#name' + i).val().trim();
      if (name) {
        var hour = parseInt($('#hour' + i).val());
        allNames.push(name);
      }
    }
    return allNames;
  }
  
  function getAllHours() {
    var allHours = [];
    for (var i = 1; i <= TOTAL_PERSON_FIELD_COUNT; i++) {
      var name = $('#name' + i).val().trim();
      if (name) {
        var hour = parseInt($('#hour' + i).val());
        allHours.push(hour);
      }
    }
    return allHours;
  }
  
  function getTotalDays() {
    var scheduleYear = parseInt($('#schedule-year').val());
    var scheduleMonth = parseInt($('#schedule-month').val());
    // total number of days in the selected month
    var totalDays = new Date(scheduleYear, scheduleMonth, 0).getDate();
    return totalDays;
  }
  
  function getAllDateStrings() {
    var dateStrings = [];
    var scheduleYear = parseInt($('#schedule-year').val());
    var scheduleMonth = parseInt($('#schedule-month').val());
    // total number of days in the selected month
    var totalDays = new Date(scheduleYear, scheduleMonth, 0).getDate();
    for (var i = 1; i <= totalDays; i++) {
      var weekday = new Date(scheduleYear, scheduleMonth-1, i).getDay();
      var weekdayKor = WEEKDAYS[weekday];
      var dateString = '' + scheduleMonth + '월 ' + i + '일 (' + weekdayKor + ')';
      dateStrings.push(dateString);
    }
    return dateStrings;
  }
  
  function renderPage1() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    $('#schedule-year').val(currentYear);
    $('#schedule-month').val(currentMonth);
  }
  
  function renderNamePositionTable(allPositions, allPersonNames) {
    // render name-position table header
    var inHtml = '<tr><th>이름</th>';
    for (var i = 0; i < allPositions.length; i++) {
      var positionName = allPositions[i];
      inHtml += '<th>' + positionName + '</th>';
    }
    inHtml + '</tr>';
    
    // render name-position table content
    for (var i = 0; i < allPersonNames.length; i++) {
      var personName = allPersonNames[i];
      inHtml += '<tr><td>' + personName + '</td>';
      for (var j = 0; j < allPositions.length; j++) {
        inHtml += '<td><input id="name' + i + '-position' + j 
            + '" type="checkbox" checked></td>';
      }2
      inHtml += '</tr>';
    }
    
    var namePositionTable = $('#name-positions-table');
    namePositionTable.empty();
    namePositionTable.html(inHtml);
  }
  
  function renderNameVacationTable(allPersonNames, allDateStrings) {
    // render name-vacation table header
    var inHtml = '<tr><th>날짜/시간</th>';
    for (var i = 0; i < allPersonNames.length; i++) {
      var personName = allPersonNames[i];
      inHtml += '<th>' + personName + '</th>';
    }
    inHtml + '</tr>';
    
    // render name-vacation table content
    for (var i = 0; i < allDateStrings.length; i++) {
      var dateString = allDateStrings[i];
      for (var j = 0; j < SHIFTS.length; j++) {
        inHtml += '<tr><td>' + dateString + ' ' + SHIFTS[j] + '</td>';
        for (var k = 0; k < allPersonNames.length; k++) {
          inHtml += '<td><input id="name-vacation-' + k + '-' + i + '-' + j
              + '" type="checkbox"></td>';
        }
        inHtml += '</tr>';
      }
    }
    
    var nameVacationTable = $('#name-vacations-table');
    nameVacationTable.empty();
    nameVacationTable.html(inHtml);
  }
  
  function renderNameMustWorkTable(allPersonNames, allDateStrings) {
    // render name-must-work table header
    var inHtml = '<tr><th>날짜/시간</th>';
    for (var i = 0; i < allPersonNames.length; i++) {
      var personName = allPersonNames[i];
      inHtml += '<th>' + personName + '</th>';
    }
    inHtml + '</tr>';
    
    // render name-must-work table content
    for (var i = 0; i < allDateStrings.length; i++) {
      var dateString = allDateStrings[i];
      for (var j = 0; j < SHIFTS.length; j++) {
        inHtml += '<tr><td>' + dateString + ' ' + SHIFTS[j] + '</td>';
        for (var k = 0; k < allPersonNames.length; k++) {
          inHtml += '<td><input id="name-must-work-' + k + '-' + i + '-' + j
              + '" type="checkbox"></td>';
        }
        inHtml += '</tr>';
      }
    }
    
    var nameMustWorkTable = $('#name-must-works-table');
    nameMustWorkTable.empty();
    nameMustWorkTable.html(inHtml);
  }
  
  function renderPage2() {
    var allPositions = getAllPositionNames();
    var allPersonNames = getAllPersonNames();
    var allDateStrings = getAllDateStrings();
    
    renderNamePositionTable(allPositions, allPersonNames);
    renderNameVacationTable(allPersonNames, allDateStrings);
    renderNameMustWorkTable(allPersonNames, allDateStrings);
  }
  
  function addToResultPanel(message) {
    var millisecondsToWait = 1000;
    setTimeout(function() {
      var inHtml = '<p>' + message + '</p>';
      $('#process-area').append(inHtml);
    }, millisecondsToWait);
    
  }
  
  function getVariables() {
    // x_a_b_c:
  }
  
  function println(str, line) {
    str += line + '\n';
  }
  
  function formatVar(a, b, c, d) {
    return '+ 1 x_' + a + '_' + b + '_' + c + '_' + d + ' ';
  }
  
  function generateMathProgString() {
    var allHours = getAllHours();
    var personCount = getAllPersonNames().length;
    var positionCount = getAllPositionNames().length;
    var dayCount = getTotalDays();
    
    var str = '';
    
    // generate objective string
    println(str, 'Maximize');
    var line = 'obj: ';
    for (var a = 0; a < personCount; a++) {
      for (var b = 0; b < dayCount; b++) {
        var c = 2;
        for (var d = 0; d < MAX_SLOTS[c]; d++) {
          line += formatVar(a, b, c, d);
        }
      }
    }
    println(str, line);
    
    // generate subject to string
    println(str, 'Subject To');
    
    // 1. per-person total work
    for (var a = 0; a < personCount; a++) {
      var line = 'total_' + a + '_max: ';
      for (var b = 0; b < dayCount; b++) {
        for (var c = 0; c < SHIFTS.length; c++) {
          for (var d = 0; d < MAX_SLOTS[c]; d++) {
            line += formatVar(a, b, c, d);
          }
        }
      }
      line += ' <= ' + allHours[a];
      println(str, line);
    }
    
    // 2. cannot work more than once in the same day
    for (var a = 0; a < personCount; a++) {
      for (var b = 0; b < dayCount; b++) {
        var line = 'nextday_' + a + '_' + b + ': ';
        for (var c = 0; c <= SHIFTS.length; c++) {
          for (var d = 0; d < MAX_SLOTS[c]; d++) {
            line += formatVar(a, b, c, d);
          }
        }
        line += '<= 1';
        println(line);
      }
    }
    
    // 3. cannot work more than once night-prn-day
    for (var a = 0; a < personCount; a++) {
      for (var b = 0; b < )
    }
    
      
      
      
      
      
    return str;
  }
  
  function calculateResult() {
    
    var data = generateMathProgString();
    var lp;

    glp_set_print_func(addToResultPanel);

    var result = {}, objective, i;
    try {
        lp = glp_create_prob();
        glp_read_lp_from_string(lp, null, data);

        glp_scale_prob(lp, GLP_SF_AUTO);

        var smcp = new SMCP({presolve: GLP_ON});
        glp_simplex(lp, smcp);

        glp_intopt(lp);
        objective = glp_mip_obj_val(lp);
        for(i = 1; i <= glp_get_num_cols(lp); i++){
            result[glp_get_col_name(lp, i)] = glp_mip_col_val(lp, i);
        }

        lp = null;
    } catch(err) {
        addToResultPanel(err.message);
    } finally {
        addToResultPanel('result' + JSON.stringify(result) + ', objective: ' + objective);
    }            
  }
  
  $('.to-page1').click(function(e) {
    renderPage1();
    moveToPage('page1');
  });
  
  $('.to-page2').click(function(e) {
    renderPage2();
    moveToPage('page2');
  });
  
  $('.to-result').click(function(e) {
    moveToPage('page-result');
    var millisecondsToWait = 1000;
    setTimeout(function() {
        calculateResult();
    }, millisecondsToWait);
  });
  
  renderPage1();
  moveToPage('page1');
});