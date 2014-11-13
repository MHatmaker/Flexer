var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.Header = "Here we are";
  $scope.Expand = "Show Plugin";
  $scope.VerbVis = "none";
  $scope.outerTblHeight = 400;
  $scope.innerTblHeight =330;
  
  $scope.presidents = {
  'Washington', 'Adams', 'Jefferson', 'Madison','Monroe', 'JQAdams', 'Jackson', 'Van Buren',
  'WHHarrison', 'Tyler', 'Polk', 'Taylor', 'Fillmore', 'Pierce', 'Buchannon', 'Lincoln', 'AJohnson', 'Grant'];
  
  $scope.onExpClick = function(){
      $scope.VerbVis = $scope.Expand == "Show Plugin" ? "inline" : "none";
      $scope.Expand = $scope.Expand == "Show Plugin" ? "Hide Plugin" : "Show Plugin";
  };
});