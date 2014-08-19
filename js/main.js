var WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
var SHIFTS = ['day', 'night', 'prn'];
var MAX_SLOTS = [3, 3, 1]; // persons to work in day, night, prn
var TOTAL_POSITION_FIELD_COUNT = 4;
var TOTAL_PERSON_FIELD_COUNT = 15;
var DAY_PER_WEEK = 7;

var DAY_INDEX = 0;
var NIGHT_INDEX = 1;
var PRN_INDEX = 2;

$(function() {
  function moveToPage(pageName) {
    $('.page').hide();
    $('#' + pageName).show();
  }
  
  function prnExists() {
    return $('#prn-exists').prop('checked');
  }
  
  function getAllPositionNames() {
    var allPositions = [];
    for (var i = 1; i <= TOTAL_POSITION_FIELD_COUNT; i++) {
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
    return getAllDateStrings().length;
  }
  
  function getAllDateStrings() {
    var dateStrings = [];
    var startYear = parseInt($('#schedule-start-year').val());
    var startMonth = parseInt($('#schedule-start-month').val());
    var startDay = parseInt($('#schedule-start-day').val());
    
    var endYear = parseInt($('#schedule-end-year').val());
    var endMonth = parseInt($('#schedule-end-month').val());
    var endDay = parseInt($('#schedule-end-day').val());
    
    var startDate = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 0);
    var endDate = new Date(endYear, endMonth - 1, endDay, 0, 0, 0, 0);
    var increment = 24 * 60 * 60 * 1000;
    
    var currentDate = startDate;
    
    while (currentDate.getTime() <= endDate.getTime()) {
      var weekday = currentDate.getDay();
      var weekdayKor = WEEKDAYS[weekday];
      var currentYear = currentDate.getFullYear();
      var currentMonth = currentDate.getMonth() + 1;
      var dateString = '' + currentYear + '년 ' + currentMonth + '월 ' + currentDate.getDate() + '일 (' + weekdayKor + ')';
      dateStrings.push(dateString);
      currentDate = new Date(currentDate.getTime() + increment);
    }

    return dateStrings;
  }
  
  function renderPage1() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    $('#schedule-start-year').val(currentYear);
    $('#schedule-start-month').val(currentMonth);
    $('#schedule-start-day').val(1);
    $('#schedule-end-year').val(currentYear);
    $('#schedule-end-month').val(currentMonth);
    $('#schedule-end-day').val(1);
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
        inHtml += '<td><input id="name-position-' + i + '-' + j 
            + '" type="checkbox" checked="checked"></td>';
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
      var maxShiftLength = prnExists() ? SHIFTS.length : SHIFTS.length - 1;
      
      for (var j = 0; j < maxShiftLength; j++) {
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
      var maxShiftLength = prnExists() ? SHIFTS.length : SHIFTS.length - 1;
      for (var j = 0; j < maxShiftLength; j++) {
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
  
  function renderPrnMustTable(allDateStrings) {
    var inHtml = '<tr><th>날짜</th><th>prn 꼭 있어야 함</th></tr>';
    for (var i = 0; i < allDateStrings.length; i++) {
      inHtml += '<tr><td>' + allDateStrings[i] + '</td>';
      inHtml += '<td><input id="prn-must-' + i + '" type="checkbox"></td></tr>';
    }
    
    var prnMustTable = $('#prn-must-table');
    prnMustTable.empty();
    prnMustTable.html(inHtml);
  }
  
  function renderPage2() {
    var allPositions = getAllPositionNames();
    var allPersonNames = getAllPersonNames();
    var allDateStrings = getAllDateStrings();
    
    renderNamePositionTable(allPositions, allPersonNames);
    renderNameVacationTable(allPersonNames, allDateStrings);
    renderNameMustWorkTable(allPersonNames, allDateStrings);
    if (prnExists()) {
      renderPrnMustTable(allDateStrings); 
    }
    else {
      $('.prn-must-settings').remove();
    }
  }
  
  function addToResultPanel(message) {
    var inHtml = '<p>' + message + '</p>';
    $('#process-area').append(inHtml);
  }
  
  function getVariableId(a, b, c, d) {
    return 'x_' + a + '_' + b + '_' + c + '_' + d;
  }
  
  function createResultTable(result) {
    var tableElem = $('#result-table');
    tableElem.empty();
    
    var allPersonNames = getAllPersonNames();
    var allPositionNames = getAllPositionNames();
    var allDateStrings = getAllDateStrings();
    var personCount = allPersonNames.length;
    var dayCount = allDateStrings.length;
    
    // generate header
    var inHtml = '<tr><th>시간/position</th>';
    for (var i = 0; i < allDateStrings.length; i++) {
      inHtml += '<th>' + allDateStrings[i] + '</th>';
    }
    inHtml += '</tr>';
    
    // generate content
    var maxShiftLength = prnExists() ? SHIFTS.length : SHIFTS.length - 1;
    for (var shift = 0; shift < maxShiftLength; shift++) {
      for (var position = 0; position < MAX_SLOTS[shift]; position++) {
        inHtml += '<tr><td>' + SHIFTS[shift];
        if (shift != PRN_INDEX) inHtml += allPositionNames[position];
        inHtml += '</td>';
        
        // iterate by date and fill out.
        for (var day = 0; day < dayCount; day++) {
          inHtml += '<td>';
          for (var person = 0; person < personCount; person++) {
            var variableId = getVariableId(person, day, shift, position);
            if (result[variableId]) {
              inHtml += allPersonNames[person];
            }
          }
          inHtml += '</td>';
        }
        
        inHtml += '</tr>';
      }
    }
    tableElem.html(inHtml);
  }
  
  function renderResultPage() {
    var processArea = $('#process-area');
    processArea.empty();
    processArea.append('<p>계산을 시작하려면 시작버튼을 누르세요.</p>');
    processArea.append('<p>몇 분 걸릴 수 있습니다.</p>');
    processArea.append('<p>중간에 나오는 영어는 안보셔도 되요.</p>');
    $('#result-table').empty();
    var calButton = $('#calculate-button');
    calButton.text('계산시작');
    calButton.off('click');
    calButton.click(run);
  }
  
  function setMax(line, maxValue) {
    return line + ' <= ' + maxValue;
  }

  function println(str, line) {
    str += line + '\n';
    return str;
  }

  function formatVar(a, b, c, d) {
    return '+ 1 x_' + a + '_' + b + '_' + c + '_' + d + ' ';
  } 

  function setMinMax(a, b, c, d, minval, maxval) {
    return minval + ' <= x_' + a + '_' + b + '_' + c + '_' + d + ' <= ' + maxval;
  }

  function generateMathProgString() {
    var allHours = getAllHours();
    var personCount = getAllPersonNames().length;
    var positionCount = getAllPositionNames().length;
    var dayCount = getTotalDays();
    var maxShiftLength = prnExists() ? SHIFTS.length : SHIFTS.length - 1;
    
    
    var str = '';
    
    /** x_a_b_c_d:
     * a: person id
     * b: day id (0-based)
     * c: time id (day: 0, night: 1, prn: 2)
     * d: position id (0, 1, 2)
     */
    
    // generate objective string
    str = println(str, 'Maximize');
    var line = 'obj: ';
    for (var a = 0; a < personCount; a++) {
      for (var b = 0; b < dayCount; b++) {
        var c = prnExists() ? 2 : 1;
        for (var d = 0; d < MAX_SLOTS[c]; d++) {
          line += formatVar(a, b, c, d);
        }
      }
    }
    str = println(str, line);
    
    // generate subject to string
    str = println(str, 'Subject To');
    
    // 1. per-person total work
    for (var a = 0; a < personCount; a++) {
      var line = 'total_' + a + '_max: ';
      for (var b = 0; b < dayCount; b++) {
        for (var c = 0; c < maxShiftLength; c++) {
          for (var d = 0; d < MAX_SLOTS[c]; d++) {
            line += formatVar(a, b, c, d);
          }
        }
      }
      line = setMax(line, allHours[a]);
      str = println(str, line);
    }
    
    // 2. cannot work more than once in the same day
    for (var a = 0; a < personCount; a++) {
      for (var b = 0; b < dayCount; b++) {
        var line = 'sameday_' + a + '_' + b + ': ';
        for (var c = 0; c < maxShiftLength; c++) {
          for (var d = 0; d < MAX_SLOTS[c]; d++) {
            line += formatVar(a, b, c, d);
          }
        }
        line = setMax(line, 1);
        str = println(str, line);
      }
    }
    
    if (prnExists()) {
      // 3. cannot work more than once (night or prn)->(day of tomorrow)
      for (var a = 0; a < personCount; a++) {
        for (var b = 0; b < dayCount-1; b++) {
          var line = 'nextday_' + a + '_' + b + ': ';
          for (var c = NIGHT_INDEX; c <= PRN_INDEX; c++) { // night, prn of today
            for (var d = 0; d < MAX_SLOTS[c]; d++) {
              line += formatVar(a, b, c, d);
            }
          }
          for (var d = 0; d < MAX_SLOTS[DAY_INDEX]; d++) { // day of tomorrow
            line += formatVar(a, b+1, 0, d);
          }
          line = setMax(line, 1);
          str = println(str, line);
        }
      }

      // 4. cannot work more than once (night) -> (prn of tomorrow)
      for (var a = 0; a < personCount; a++) {
        for (var b = 0; b < dayCount-1; b++) {
          var line = 'no_prn_after_night_' + a + '_' + b + ': ';
          for (var d = 0; d < MAX_SLOTS[NIGHT_INDEX]; d++) { // night of today
            line += formatVar(a, b, 1, d);
          }
          for (var d = 0; d < MAX_SLOTS[PRN_INDEX]; d++) { // prn of tomorrow
            line += formatVar(a, b+1, 2, d);
          }
          line = setMax(line, 1);
          str = println(str, line);
        }
      }
    }
    
    // 5. someone should work at given day and night
    for (var b = 0; b < dayCount; b++) {
      for (var c = DAY_INDEX; c <= NIGHT_INDEX; c++) {
        for (var d = 0; d < MAX_SLOTS[c]; d++) {
          var line = 'should_' + b + '_' + c + '_' + d + ': ';
          for (var a = 0; a < personCount; a++) {
            line += formatVar(a, b, c, d);
          }
          line += ' = 1';
          str = println(str, line);
        }
      }
    }
    
    if (prnExists()) {
      // 6. someone should work at some prn and may not work at some prn
      for (var b = 0; b < dayCount; b++) {
        var line = 'prn_work_' + b + '_' + PRN_INDEX + '_0: ';
        for (var a = 0; a < personCount; a++) {
          line += formatVar(a, b, PRN_INDEX, 0);
        }
        var mustPrn = $('#must-prn-' + b).is(':checked');
        if (mustPrn) line += ' = 1';
        else line = setMax(line, 1);
        str = println(str, line);
      }
    }
    
    // skip 7, 8, 9: they will be covered in Bounds
    
    // 10. Maximum n night shifts per 7 consecutive days
    var maxNightInSevenDays = $('#max-night-in-seven-days').val();
    for (var a = 0; a < personCount; a++) {
      for (var b = 0; b < dayCount-DAY_PER_WEEK; b++) {
        var line = 'max_night_in_seven_days_' + a + '_' + b + ': '
        for (var day = 0; day < DAY_PER_WEEK; day++) {
          for (var d = 0; d < MAX_SLOTS[NIGHT_INDEX]; d++) {
            line += formatVar(a, b+day, NIGHT_INDEX, d);
          }
        }
        line = setMax(line, maxNightInSevenDays);
        str = println(str, line);
      }
    }
      
    // 11. Maximum n consecutive nights
    var maxConsecutiveNight = $('#max-consecutive-night').val();
    for (var a = 0; a < personCount; a++) {
      for (var b = 0; b < dayCount-maxConsecutiveNight-1; b++) {
        var line = 'consecutive_night_' + a + '_' + b + ': ';
        for (var day = 0; day <= maxConsecutiveNight; day++) {
          for (var d = 0; d < MAX_SLOTS[NIGHT_INDEX]; d++) {
            line += formatVar(a, b+day, NIGHT_INDEX, d);
          }
        }
        line = setMax(line, maxConsecutiveNight);
        str = println(str, line);
      }
    }
    
    
    // Bounds
    str = println(str, 'Bounds')
    for (var a = 0; a < personCount; a++) {
      for (var b = 0; b < dayCount; b++) {
        for (var c = 0; c < maxShiftLength; c++) {
          // ASSUME NO INCONSISTENCY!!!
          // if person should work
          var shouldWork = $('#name-must-work-' + a + '-' + b + '-' + c).is(':checked');
          // if person should not work
          var isVacation = $('#name-vacation-' + a + '-' + b + '-' + c).is(':checked');
          var minval = null;
          var maxval = null;
          for (var d = 0; d < MAX_SLOTS[c]; d++) {
            if (shouldWork) {
              minval = 1;
              maxval = 1;
            }
            else if (isVacation) {
              minval = 0;
              maxval = 0;
            }
            else if (c == PRN_INDEX) {
              // anyone can work in prn
              minval = 0;
              maxval = 1;
            }
            else {
              minval = 0;
              // if person can work in this position
              var namePositionElem = $('#name-position-' + a + '-' + d);
              var canWorkPosition = namePositionElem.is(':checked');
              if (canWorkPosition) maxval = 1;
              else maxval = 0;
            }
            var line = setMinMax(a, b, c, d, minval, maxval);
            str = println(str, line);
          }
        }
      }
    }
    
    str = println(str, 'Generals')
    for (var a = 0; a < personCount; a++) {
      for (var b = 0; b < dayCount; b++) {
        for (var c = 0; c < maxShiftLength; c++) {
          for (var d = 0; d < MAX_SLOTS[c]; d++) {
            line = 'x_' + a + '_' + b + '_' + c + '_' + d;
            str = println(str, line);
          }
        }
      }
    }
    
    str = println(str, 'End')
    
    return str;
  }
  
  var job;
  
  function run(){
    job = new Worker('js/solver.js');
    job.onmessage = function (e) {
      var obj = e.data;
      switch (obj.action){
        case 'log':
          addToResultPanel(obj.message);
          break;
        case 'done':
          stop();
          var processArea = $('#process-area');
          processArea.empty();
          $('#result-table').empty();
          //addToResultPanel(JSON.stringify(obj.result));
          createResultTable(obj.result);
          break;
      }
    };

    var calButton = $('#calculate-button');
    calButton.text('중지');
    calButton.off('click');
    calButton.click(stop);
    job.postMessage({action: 'load', data: generateMathProgString(), mip: true});
  }

  function stop(){
    job.terminate();
    job = null;
    var calButton = $('#calculate-button');
    calButton.text('계산 시작');
    calButton.off('click');
    calButton.click(run);
  }

  
  $('.to-page1').click(function(e) {
    renderPage1();
    moveToPage('page1');
  });
  
  $('.to-page2').click(function(e) {
    renderPage2();
    moveToPage('page2');
  });
  
  $('.from-result-to-page2').click(function(e) {
    if (job) {
      stop();
      job = null;
    }
    moveToPage('page2');
  });
  
  $('.to-result').click(function(e) {
    renderResultPage();
    moveToPage('page-result');
  });
  
  renderPage1();
  moveToPage('page1');
});