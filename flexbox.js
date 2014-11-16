
function getDocHeight() {
    return Math.max(
        //document.body.scrollHeight, document.documentElement.scrollHeight,
        0, //document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
}

function checkMedia(){
  var mq = window.matchMedia('@media all and (min-width: 400px)');
  if(mq.matches) {
    alert("more than initial");
      // the width of browser is more then 700px
  } else {
    alert("less than initial");
      // the width of browser is less then 700px
  } 
  mq.addListener(function(changed) {
    if(changed.matches) {
        alert("matches");
    } else {
        alert("no matche");
    }
});
}

var app = angular.module('plunker', []);

var presidentList = [
  'Washington', 'Adams', 'Jefferson', 'Madison','Monroe', 'JQAdams', 'Jackson', 'Van Buren',
  'WHHarrison', 'Tyler', 'Polk', 'Taylor', 'Fillmore', 'Pierce', 'Buchannon', 'Lincoln', 'AJohnson', 'Grant',
  'Hayes', 'Garfield', 'Arthur', 'Cleveland22', 'BHarrison', 'Cleveland24', 'McKinley', 'TRoosevelt', 'Taft',
  'Wilson', 'Harding', 'Coolidge', 'Hoover', 'FRoosevelt', 'Truman', 'Eisenhower', 'Kennedy', 'LJohnson',
  'Nixon', 'Ford', 'Carter', 'Reagan', 'GHWBush', 'Clinton', 'GWBush', 'Obama'];
  
var ulRatio = 0.9;

var currentSelectedTab = {
  'site' : 'google',
  'imgSrc' : 'http://www.schaik.com/pingpong/pingpong_button.gif',
  'title' : 'google maps'
};

function getButtonHeight(){
  var expBtn = document.getElementById("idExpButton");
  //alert(expBtn);
  var expBtnA = angular.element(expBtn);
  //alert(expBtnA);
  var btnHeight = expBtn.clientHeight;
  //alert(btnHeight);
  return btnHeight * 0.8;
}
  

app.controller('MainCtrl', function($scope) {
  $scope.Header = "Site Exerciser";
  $scope.Expand = "Show Plugin";
  $scope.VerbVis = "none";
  $scope.wrapperHeight = getDocHeight();
  //alert($scope.wrapperHeight);
  //heckMedia();
  $scope.outerTblHeight = $scope.wrapperHeight * ulRatio;
  $scope.innerTblHeight = $scope.outerTblHeight *ulRatio;
  
  $scope.presidents = presidentList;
  $scope.currentTab = currentSelectedTab;
  $scope.expBtnHeight = getButtonHeight();
  //alert($scope.expBtnHeight)
  
  $scope.onExpClick = function(){
      $scope.VerbVis = $scope.Expand == "Show Plugin" ? "inline" : "none";
      $scope.Expand = $scope.Expand == "Show Plugin" ? "Hide Plugin" : "Show Plugin";
      $scope.outerTblHeight = $scope.wrapperHeight * ulRatio;
      $scope.innerTblHeight = $scope.outerTblHeight *ulRatio;
  };
});