var WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
var SHIFTS = ['day', 'night', 'prn'];
var POSITION_COUNT = 4;
var PERSON_COUNT = 15;

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
    for (var i = 1; i <= PERSON_COUNT; i++) {
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
    for (var i = 1; i <= PERSON_COUNT; i++) {
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
  
  function generateMathProgString() {
    // generate MathProg string
    return 'Maximize\nobj: + 786433 x1 + 655361 x2 + 589825 x3 + 557057 x4\n+ 540673 x5 + 532481 x6 + 528385 x7 + 526337 x8 + 525313 x9\n+ 524801 x10 + 524545 x11 + 524417 x12 + 524353 x13\n+ 524321 x14 + 524305 x15\n\nSubject To\ncap: + 786433 x1 + 655361 x2 + 589825 x3 + 557057 x4\n+ 540673 x5 + 532481 x6 + 528385 x7 + 526337 x8 + 525313 x9\n+ 524801 x10 + 524545 x11 + 524417 x12 + 524353 x13\n+ 524321 x14 + 524305 x15 <= 4194303.5\n\nBounds\n0 <= x1 <= 1\n0 <= x2 <= 1\n0 <= x3 <= 1\n0 <= x4 <= 1\n0 <= x5 <= 1\n0 <= x6 <= 1\n0 <= x7 <= 1\n0 <= x8 <= 1\n0 <= x9 <= 1\n0 <= x10 <= 1\n0 <= x11 <= 1\n0 <= x12 <= 1\n0 <= x13 <= 1\n0 <= x14 <= 1\n0 <= x15 <= 1\n\nGenerals\nx1\nx2\nx3\nx4\nx5\nx6\nx7\nx8\nx9\nx10\nx11\nx12\nx13\nx14\nx15\n\nEnd\n\n';
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