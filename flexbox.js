
function getDocHeight() {
    return Math.max(
        //document.body.scrollHeight, document.documentElement.scrollHeight,
        0, //document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
}

var app = angular.module('plunker', []);

var presidentList = [
  'Washington', 'Adams', 'Jefferson', 'Madison','Monroe', 'JQAdams', 'Jackson', 'Van Buren',
  'WHHarrison', 'Tyler', 'Polk', 'Taylor', 'Fillmore', 'Pierce', 'Buchannon', 'Lincoln', 'AJohnson', 'Grant',
  'Hayes', 'Garfield', 'Arthur', 'Cleveland22', 'BHarrison', 'Cleveland24', 'McKinley', 'TRoosevelt', 'Taft',
  'Wilson', 'Harding', 'Coolidge', 'Hoover', 'FRoosevelt', 'Truman', 'Eisenhower', 'Kennedy', 'LJohnson',
  'Nixon', 'Ford', 'Carter', 'Reagan', 'GHWBush', 'Clinton', 'GWBush', 'Obama'];
  
var ulRatio = 0.9;
  

app.controller('MainCtrl', function($scope) {
  $scope.Header = "Site Exerciser";
  $scope.Expand = "Show Plugin";
  $scope.VerbVis = "none";
  $scope.wrapperHeight = getDocHeight();
  //alert($scope.wrapperHeight);
  $scope.outerTblHeight = $scope.wrapperHeight * ulRatio;
  $scope.innerTblHeight = $scope.outerTblHeight *ulRatio;
  
  $scope.presidents = presidentList;
  
  $scope.onExpClick = function(){
      $scope.VerbVis = $scope.Expand == "Show Plugin" ? "inline" : "none";
      $scope.Expand = $scope.Expand == "Show Plugin" ? "Hide Plugin" : "Show Plugin";
      $scope.outerTblHeight = $scope.wrapperHeight * ulRatio;
      $scope.innerTblHeight = $scope.outerTblHeight *ulRatio;
  };
});