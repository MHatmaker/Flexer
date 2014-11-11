var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.Header = "Here we are";
  $scope.Expand = "Show Plugin";
  $scope.VerbVis = "none";
  $scope.numColsToSpan = 3;
  
  $scope.onExpClick = function(){
      $scope.VerbVis = $scope.Expand == "Show Plugin" ? "inline" : "none";
      $scope.numColsToSpan = $scope.Expand == "Show Plugin" ? 2 : 3;
      $scope.Expand = $scope.Expand == "Show Plugin" ? "Hide Plugin" : "Show Plugin";
  };
});