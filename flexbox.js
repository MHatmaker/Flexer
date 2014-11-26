
function getDocHeight() {
  var body = document.body,
    html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
  /*
  return height;
  return window.innerHeight;
  */
  //var masterSiteHgt = getElemHeight('idMasterSite');
  //return masterSiteHgt;
    
 // var appBody = getElemHeight('idAppBody'); //document.getElementsByClassName("idAppBody");
  //var appBody = document.getElementById('idAppBody');
  //return appBody.clientHeight - 100;
  
  return window.innerHeight - 10;
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
  
  placeFooter();
  var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
  showHeights(prevTotalHgt, totalHgt);
  prevTotalHgt = totalHgt;
  var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
  $scope.innerTblHeight = colHgt + hgtComponents["idSiteTopRow"];
  $scope.leftColHeight = colHgt;
  $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents["idFooter"];
  $scope.childSiteHeight = getDocHeight() - totalHgt  + getElemHeight("idNavigator") + 
    getElemHeight("idSiteTopRow") + getElemHeight("idFooter");
  //alert(getDocHeight());
  //alert($scope.childSiteHeight);
  
  $scope.presidents = presidentList;
  $scope.currentTab = currentSelectedTab;
  $scope.positionView = posView;
  $scope.viewOptions = viewOpts;
  $scope.currentViewOption = $scope.viewOptions[2];
  
  $scope.expBtnHeight = getButtonHeight();
  //alert($scope.expBtnHeight)
  
  
  function getComponentHeights(sumVis, siteVis){
    var totalHgt = 0;
    if(sumVis != "inline"){
      totalHgt = getElemHeight("idMasterSiteExpander");
      if(siteVis != 'inline'){
        totalHgt += getElemHeight("idFooter");
      }
    }
    else{
      var masterSiteHgt = 0;
      var hgt = 0;
      hgtComponents["idMasterSite"] =  masterSiteHgt = getDocHeight(); //getElemHeight("idMasterSite");
      hgtComponents["idMasterSiteExpander"] =  hgt = getElemHeight("idMasterSiteExpander"); totalHgt += hgt;
      hgtComponents["idMasterSiteSummary"] =  hgt = getElemHeight("idMasterSiteSummary"); totalHgt += hgt;
      hgtComponents["idNavigator"] =  hgt = getElemHeight("idNavigator");  totalHgt += hgt;
      hgtComponents["idSiteTopRow"] =  hgt = getElemHeight("idSiteTopRow"); totalHgt += hgt;
      if(siteVis == 'inline'){
        hgtComponents["idFooter"] =  hgt = getElemHeight("idFooter") + 10;  totalHgt += hgt;
      }
    }
    return totalHgt;
  }
  
  function getAvailableSiteColumnHeights(sumVis, siteVis){
    var totalHgt = 0;
    var colHgt = 0;
    if(sumVis != "inline"){
      if(siteVis != 'inline'){
        colHgt = getDocHeight() -  getElemHeight("idMasterSiteExpander") - getElemHeight("idNavigator");
      }
      else{
        colHgt = getDocHeight() -  getElemHeight("idMasterSiteExpander") - getElemHeight["idFooter"] -
            getElemHeight("idSiteTopRow") - getElemHeight("idNavigator");
      }
    }
    else{
      var masterSiteHgt = 0;
      var hgt = 0;
      hgtComponents["idMasterSite"] =  masterSiteHgt = getDocHeight(); //getElemHeight("idMasterSite");
      hgtComponents["idMasterSiteExpander"] =  hgt = getElemHeight("idMasterSiteExpander"); totalHgt += hgt;
      hgtComponents["idMasterSiteSummary"] =  hgt = getElemHeight("idMasterSiteSummary"); totalHgt += hgt;
      hgtComponents["idNavigator"] =  hgt = getElemHeight("idNavigator");  totalHgt += hgt;
      hgtComponents["idSiteTopRow"] =  hgt = getElemHeight("idSiteTopRow"); totalHgt += hgt;
      hgtComponents["idFooter"] =  hgt = getElemHeight("idFooter") + 10;  totalHgt += hgt;
      if(siteVis != 'inline'){
        colHgt = getDocHeight() -  hgtComponents["idMasterSiteExpander"]
          - hgtComponents["idMasterSiteSummary"] - hgtComponents["idNavigator"];
      }
      else{
        colHgt = getDocHeight() -  hgtComponents["idMasterSiteExpander"]
          - hgtComponents["idMasterSiteSummary"] - hgtComponents["idNavigator"] - hgtComponents["idSiteTopRow"] - hgtComponents["idFooter"];
      }
    }
    return colHgt;
  }
  
  function placeFooter(){
    /*
    var ftr = document.getElementById('idFooter');
    var ftrA = angular.element(ftr);
    var ftrHeight = getElemHeight("idFooter");
    var hgtStuff = '' + getDocHeight();
    hgtStuff += ' ' + ftrHeight;
    alert(hgtStuff);
    ftr.style.top = '' + (getDocHeight() - ftrHeight) + 'px';
    alert(ftr.style.top);
    */
  }
  
  $scope.onExpSumClick = function(){
      $scope.MasterSiteVis = $scope.ExpandSum == "Show Summary" ? "inline" : "none";
      $scope.ExpandSum = $scope.ExpandSum == "Show Summary" ? "Hide Summary" : "Show Summary";
      placeFooter();
      var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
      showHeights(prevTotalHgt, totalHgt);
      prevTotalHgt = totalHgt;
      var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
      $scope.innerTblHeight = colHgt + hgtComponents["idSiteTopRow"];
      $scope.leftColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents["idFooter"];
      $scope.childSiteHeight = getDocHeight() - totalHgt;
  };
  
  $scope.onExpPlugClick = function(){
      $scope.VerbVis = $scope.ExpandPlug == "Show Plugin" ? "inline" : "none";
      $scope.ExpandPlug = $scope.ExpandPlug == "Show Plugin" ? "Hide Plugin" : "Show Plugin";
      placeFooter();
      var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
      showHeights(prevTotalHgt, totalHgt);
      prevTotalHgt = totalHgt;
      var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
      $scope.innerTblHeight = colHgt + hgtComponents["idSiteTopRow"];
      $scope.leftColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents["idFooter"];
      $scope.childSiteHeight = getDocHeight() - totalHgt;
  };
  $scope.onExpSiteClick = function(){
      $scope.SiteVis = $scope.ExpandSite == "Show WebSite" ? "inline" : "none";
      $scope.ExpandSite = $scope.ExpandSite == "Show WebSite" ? "Hide WebSite" : "Show WebSite";
      placeFooter();
      var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
      showHeights(prevTotalHgt, totalHgt);
      prevTotalHgt = totalHgt;
      var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
      $scope.innerTblHeight = colHgt + hgtComponents["idSiteTopRow"];
      $scope.leftColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents["idFooter"];
      $scope.childSiteHeight = getDocHeight() - totalHgt;
  };
});