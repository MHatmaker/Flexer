
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
  
  return window.innerHeight - 30;
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
    "totalHgt" : null,
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
    //alert(prevStr + nowStr);
}

function showRelativeHeights(totTot, tot, elem){
    var totTotStr = "grand total height : " + totTot;
    var totStr = " total height : " + tot;
    var elemStr = " element height : " + elem;
    //alert(totTotStr + totStr + elemStr);
}
  
app.controller('MainCtrl', function($scope) {
  $scope.Header = "Site Exerciser";
  $scope.ExpandPlug = "Show Plugin";
  $scope.ExpandSum = "Hide Summary";
  $scope.ExpandSite = "Hide WebSite";
  $scope.VerbVis = "none";
  $scope.MasterSiteVis = "inline";
  $scope.SiteVis = "flex";
  
  placeFooter();
  calculateComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
  var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
  showHeights(prevTotalHgt, totalHgt);
  prevTotalHgt = totalHgt;
  var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
  $scope.innerTblHeight = colHgt + hgtComponents.idSiteTopRow + hgtComponents.idFooter;
  $scope.leftColHeight = colHgt;
  $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents.idFooter;
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
  //alert($scope.expBtnHeight);
  
  function calculateComponentHeights(sumvis, sitevis){
    var totalHgt = 0;
    var masterSiteHgt = 0;
    var hgt = 0;
    hgtComponents.idMasterSite =  masterSiteHgt = getDocHeight();
    hgtComponents.idMasterSiteExpander =  hgt = getElemHeight("idMasterSiteExpander"); totalHgt += hgt;
    hgtComponents.idMasterSiteSummary =  hgt = getElemHeight("idMasterSiteSummary"); totalHgt += hgt;
    hgtComponents.idNavigator =  hgt = getElemHeight("idNavigator");  totalHgt += hgt;
    hgtComponents.idSiteTopRow =  hgt = getElemHeight("idSiteTopRow"); totalHgt += hgt;
    hgtComponents.idFooter =  hgt = getElemHeight("idFooter");  totalHgt += hgt;
    hgtComponents.totalHgt = totalHgt;
  }
  
  
  function getComponentHeights(sumVis, siteVis){
    var totalHgt = 0;
    if(sumVis == "inline"){
      if(siteVis == 'flex'){
        totalHgt = hgtComponents.totalHgt;
        showRelativeHeights(totalHgt, getDocHeight(), hgtComponents.idMasterSiteSummary);
      }
      else{
        totalHgt = hgtComponents.totalHgt - hgtComponents.idSiteTopRow - hgtComponents.idFooter;
        showRelativeHeights(totalHgt, getDocHeight(), hgtComponents.idMasterSiteSummary);
      }
    }
    else{  // sumVis == "none"
      if(siteVis == 'flex'){
        totalHgt = hgtComponents.totalHgt - hgtComponents.idMasterSiteSummary;
        showRelativeHeights(totalHgt, getDocHeight(), hgtComponents.idMasterSiteSummary);
      }
      else{
        totalHgt = hgtComponents.idMasterSiteExpander + hgtComponents.idNavigator;
        showRelativeHeights(totalHgt, getDocHeight(), hgtComponents.idMasterSiteSummary);
      }
    }
    return totalHgt;
  }
  
  function getAvailableSiteColumnHeights(sumVis, siteVis){
    var totalHgt = 0;
    var colHgt = 0;
    if( sumVis == "inline"){
      if(siteVis == 'flex'){
        var colHgtB = getDocHeight() - hgtComponents.totalHgt;
        colHgt = colHgtB
        showRelativeHeights(colHgt, getDocHeight(), hgtComponents.idMasterSiteSummary);
      }
      else{ // siteVis == "none"
        var colHgtBB = getDocHeight() -  hgtComponents.idMasterSiteExpander
          - hgtComponents.idMasterSiteSummary - hgtComponents.idNavigator;
        colHgt = colHgtBB;
        showRelativeHeights(colHgt, getDocHeight(), hgtComponents.idMasterSiteSummary);
      }
    }
    else{ // sumVis == "none"
      if(siteVis == 'flex'){
        var colHgtA = getDocHeight() - hgtComponents.idMasterSiteExpander - hgtComponents.idNavigator - 
          hgtComponents.idSiteTopRow - hgtComponents.idFooter;
        colHgt = colHgtA;
        showRelativeHeights(colHgt, getDocHeight(), hgtComponents.idMasterSiteSummary);
      }
      else{ // siteVis == "none"
        var colHgtAA = getDocHeight() - hgtComponents.idMasterSiteExpander - hgtComponents.idNavigator;
        colHgt = colHgtAA;
        showRelativeHeights(colHgt, getDocHeight(), hgtComponents.idMasterSiteSummary);
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
      //calculateComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
      var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
      showHeights(prevTotalHgt, totalHgt);
      prevTotalHgt = totalHgt;
      var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
      $scope.innerTblHeight = colHgt + hgtComponents.idSiteTopRow + hgtComponents.idFooter;
      $scope.leftColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents.idFooter;
      $scope.childSiteHeight = colHgt; // getDocHeight() - totalHgt;
  };
  
  $scope.onExpPlugClick = function(){
      $scope.VerbVis = $scope.ExpandPlug == "Show Plugin" ? "flex" : "none";
      $scope.ExpandPlug = $scope.ExpandPlug == "Show Plugin" ? "Hide Plugin" : "Show Plugin";
      placeFooter();
      //calculateComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
      var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
      showHeights(prevTotalHgt, totalHgt);
      prevTotalHgt = totalHgt;
      var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
      if($scope.SiteVis == 'flex'){
        $scope.innerTblHeight = colHgt + hgtComponents.idSiteTopRow + hgtComponents.idFooter;
      }
      else{
        $scope.innerTblHeight = colHgt; // + hgtComponents.idSiteTopRow + hgtComponents.idFooter;
      }
      $scope.leftColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents.idFooter;
      $scope.childSiteHeight = colHgt; // getDocHeight() - totalHgt;
  };
  $scope.onExpSiteClick = function(){
      $scope.SiteVis = $scope.ExpandSite == "Show WebSite" ? "flex" : "none";
      $scope.ExpandSite = $scope.ExpandSite == "Show WebSite" ? "Hide WebSite" : "Show WebSite";
      $scope.mapColWidth = $scope.ExpandSite == "Show WebSite" ? "100%" : "inherit";
      placeFooter();
      //calculateComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
      var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
      showHeights(prevTotalHgt, totalHgt);
      prevTotalHgt = totalHgt;
      var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
      if($scope.SiteVis == 'flex'){
        $scope.innerTblHeight = colHgt + hgtComponents.idSiteTopRow + hgtComponents.idFooter;
      }
      else{
        $scope.innerTblHeight = colHgt;
      }
      $scope.leftColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents.idFooter;
      $scope.childSiteHeight = getDocHeight() - totalHgt;
  };
});