var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.Header = "Here we are";
  $scope.Expand = "Show Plugin";
  $scope.VerbVis = "none";
  $scope.numColsToSpan = 4;
  $scope.outerTblHeight = 400;
  $scope.innerTblHeight =330;
  
  $scope.onExpClick = function(){
      $scope.VerbVis = $scope.Expand == "Show Plugin" ? "inline" : "none";
      $scope.numColsToSpan = $scope.Expand == "Show Plugin" ? 3 : 4;
      $scope.Expand = $scope.Expand == "Show Plugin" ? "Hide Plugin" : "Show Plugin";
  };
});