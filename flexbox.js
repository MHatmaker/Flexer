var app = angular.module('plunker', []);

var presidentList = [
  'Washington', 'Adams', 'Jefferson', 'Madison','Monroe', 'JQAdams', 'Jackson', 'Van Buren',
  'WHHarrison', 'Tyler', 'Polk', 'Taylor', 'Fillmore', 'Pierce', 'Buchannon', 'Lincoln', 'AJohnson', 'Grant',
  'Hayes', 'Garfield', 'Arthur', 'Cleveland22', 'BHarrison', 'Cleveland24', 'McKinnely'];
  
var ulRatio = 0.9;
  

app.controller('MainCtrl', function($scope) {
  $scope.Header = "Here we are";
  $scope.Expand = "Show Plugin";
  $scope.VerbVis = "none";
  $scope.outerTblHeight = 400;
  $scope.innerTblHeight = $scope.outerTblHeight *ulRatio;
  
  $scope.presidents = presidentList;
  
  $scope.onExpClick = function(){
      $scope.VerbVis = $scope.Expand == "Show Plugin" ? "inline" : "none";
      $scope.Expand = $scope.Expand == "Show Plugin" ? "Hide Plugin" : "Show Plugin";
      $scope.innerTblHeight = $scope.outerTblHeight * ulRatio;
  };
});