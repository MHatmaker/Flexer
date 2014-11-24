
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
  'site' : 'Site hosting a google map',
  'imgSrc' : 'http://www.schaik.com/pingpong/pingpong_button.gif',
  'title' : 'google maps'
};

var posView = "-87.713, 41.891";
var viewOpts = [ 
  { 
    type : 'zoom level',
    key : 'zm',
    value : 'zm, scale'
  },
  { 
    type : 'map center',
    key : 'cntr',
    value : 'cntrlng, cntrlat'
  },
  { 
    type : 'mouse coords',
    key : 'coords',
    value : 'evlng, evlat'
  }
  ];

function getButtonHeight(){
  var expBtn = document.getElementById("idExpPlugButton");
  //alert(expBtn);
  var expBtnA = angular.element(expBtn);
  //alert(expBtnA);
  var btnHeight = expBtn.clientHeight;
  //alert(btnHeight);
  return btnHeight * 0.6;
}
  
function getElemHeight(itm){
  var elem = document.getElementById(itm);
  //alert(expBtn);
  var elemA = angular.element(elem);
  //alert(expBtnA);
  var elemHeight = elem.clientHeight;
  //alert(btnHeight);
  return elemHeight;
}

  var hgtComponents = {
    "idMasterSite" : null,
    "idMasterSiteExpander": null,
    "idMasterSiteSummary" : null,
    "idNavigator" : null,
    "idSiteTopRow" : null,
    "idFooter" : null,
  };
  
var prevTotalHgt = 0;

function showHeights(prev, now){
    var prevStr = "Previous total height : " + prev;
    var nowStr = " New total height : " + now;
    alert(prevStr + nowStr);
}
  
app.controller('MainCtrl', function($scope) {
  $scope.Header = "Site Exerciser";
  $scope.ExpandPlug = "Show Plugin";
  $scope.ExpandSum = "Hide Summary";
  $scope.ExpandSite = "Hide WebSite";
  $scope.VerbVis = "none";
  $scope.MasterSiteVis = "inline";
  $scope.SiteVis = "inline";
  //$scope.wrapperHeight = getDocHeight();
  // $scope.wrapperHeight = getDocHeight();
  //alert($scope.wrapperHeight);
  //checkMedia();
  //$scope.outerTblHeight = $scope.wrapperHeight * ulRatio;
  //$scope.innerTblHeight = $scope.outerTblHeight *ulRatio;
  
  placeFooter();
  var totalHgt = getComponentHeights(true);
  showHeights(prevTotalHgt, totalHgt);
  prevTotalHgt = totalHgt;
  var colHgt = geAvailableSiteColumnHeights($scope.MasterSiteVis);
  $scope.innerTblHeight = colHgt + hgtComponents["idSiteTopRow"];
  $scope.leftColHeight = colHgt;
  $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents["idFooter"];
  
  $scope.presidents = presidentList;
  $scope.currentTab = currentSelectedTab;
  $scope.positionView = posView;
  $scope.viewOptions = viewOpts;
  $scope.currentViewOption = $scope.viewOptions[2];
  
  $scope.expBtnHeight = getButtonHeight();
  //alert($scope.expBtnHeight)
  
  
  function getComponentHeights(sumVis){
    var totalHgt = 0;
    if(sumVis == false){
      totalHgt = getElemHeight("idMasterSiteExpander");
    }
    else{
      var masterSiteHgt = 0;
      var hgt = 0;
      hgtComponents["idMasterSite"] =  masterSiteHgt = getDocHeight(); //getElemHeight("idMasterSite");
      hgtComponents["idMasterSiteExpander"] =  hgt = getElemHeight("idMasterSiteExpander"); totalHgt += hgt;
      hgtComponents["idMasterSiteSummary"] =  hgt = getElemHeight("idMasterSiteSummary"); totalHgt += hgt;
      hgtComponents["idNavigator"] =  hgt = getElemHeight("idNavigator");  totalHgt += hgt;
      hgtComponents["idSiteTopRow"] =  hgt = getElemHeight("idSiteTopRow"); totalHgt += hgt;
      hgtComponents["idFooter"] =  hgt = getElemHeight("idFooter");  totalHgt += hgt;
    }
    return totalHgt;
  }
  
  function geAvailableSiteColumnHeights(sumVis){
    var colHgt = 0;
    if(sumVis == false){
      colHgt = getDocHeight() -  getElemHeight("idMasterSiteExpander");
    }
    else{
      colHgt = getDocHeight() -  hgtComponents["idMasterSiteExpander"]
        - hgtComponents["idMasterSiteSummary"] - hgtComponents["idNavigator"] - hgtComponents["idSiteTopRow"] - hgtComponents["idFooter"];
    }
    return colHgt;
  }
  
  function placeFooter(){
    var ftr = document.getElementById('idFooter');
    var ftrA = angular.element(ftr);
    var ftrHeight = getElemHeight("idFooter");
    ftr.style.top = getDocHeight() - (ftrHeight + 'px');
  }
  
  $scope.onExpSumClick = function(){
      $scope.MasterSiteVis = $scope.ExpandSum == "Show Summary" ? "inline" : "none";
      $scope.ExpandSum = $scope.ExpandSum == "Show Summary" ? "Hide Summary" : "Show Summary";
      var totalHgt = getComponentHeights($scope.MasterSiteVis);
      showHeights(prevTotalHgt, totalHgt);
      prevTotalHgt = totalHgt;
      var colHgt = geAvailableSiteColumnHeights($scope.MasterSiteVis);
      $scope.innerTblHeight = colHgt + hgtComponents["idSiteTopRow"];
      $scope.leftColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents["idFooter"];
  };
  
  $scope.onExpPlugClick = function(){
      $scope.VerbVis = $scope.ExpandPlug == "Show Plugin" ? "inline" : "none";
      $scope.ExpandPlug = $scope.ExpandPlug == "Show Plugin" ? "Hide Plugin" : "Show Plugin";
      var totalHgt = getComponentHeights($scope.MasterSiteVis);
      showHeights(prevTotalHgt, totalHgt);
      prevTotalHgt = totalHgt;
      var colHgt = geAvailableSiteColumnHeights($scope.MasterSiteVis);
      $scope.innerTblHeight = colHgt + hgtComponents["idSiteTopRow"];
      $scope.leftColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents["idFooter"];
  };
  $scope.onExpSiteClick = function(){
      $scope.SiteVis = $scope.ExpandSite == "Show WebSite" ? "inline" : "none";
      $scope.ExpandSite = $scope.ExpandSite == "Show WebSite" ? "Hide WebSite" : "Show WebSite";
      var totalHgt = getComponentHeights($scope.MasterSiteVis);
      showHeights(prevTotalHgt, totalHgt);
      prevTotalHgt = totalHgt;
      var colHgt = geAvailableSiteColumnHeights($scope.MasterSiteVis);
      $scope.innerTblHeight = colHgt + hgtComponents["idSiteTopRow"];
      $scope.leftColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents["idFooter"];
  };
});