WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

$(function() {
  function moveToPage(pageName) {
    $('.page').hide();
    $('#' + pageName).show();
  }
  
  function renderPage1() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    $('#schedule-year').val(currentYear);
    $('#schedule-month').val(currentMonth);
  }
  
  function renderPage2() {
    
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
    calculateResult();
  });
  
  renderPage1();
  moveToPage('page1');
});