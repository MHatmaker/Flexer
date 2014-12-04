
function getDocHeight() {
  var body = document.body,
    html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
  
  return window.innerHeight - 30;
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
  
app.controller('MainCtrl', function($scope, $window) {
  $scope.Header = "Site Exerciser";
  $scope.ExpandPlug = "Show Plugin";
  $scope.ExpandSum = "Hide Summary";
  $scope.ExpandNav = "Hide Navigator";
  $scope.ExpandSite = "Hide WebSite";
  $scope.VerbVis = "none";
  $scope.MasterSiteVis = "inline";
  $scope.NavigatorVis = "flex";
  $scope.SiteVis = "flex";
  
  var status = {
    'mastersite' : true,
    'navigator' : true,
    'website' : true,
    'plugin' : false
    };
    
  function printStatus(msg){ 
    var msgstr = String.format("{0}... mastersite ? : {1}, navigator ? : {2}, website ? : {3}, plugin ? : {4}", 
             msg, status['mastersite'], status['navigator'], status['website'], status['plugin']);
    console.log(msgstr)
    // msgstr = String.format("verbage {0}, website {1}", verbageWidth[status['plugin']], websiteVisibility[status['website']]);
    // console.log(msgstr)
  }
 
  function onShowMasterWebSite(e, from, to, msg){ 
    status['mastersite'] = true;
    printStatus('Show Master Web Site!');
  }
    
  function onHideMasterWebSite(e, from, to, msg){ 
    status['mastersite'] = false;
    printStatus('Hide Master Web Site!');
  }

  function onShowNavigator(e, from, to, msg){ 
    status['navigator'] = true;
    printStatus('Show Navigator!');
  }
 
  function onHideNavigator(e, from, to, msg){ 
    status['navigator'] = false;
    printStatus('Hide Navigator!');
  }
  
  function onShowPlugin(e, from, to, msg){ 
    status['plugin'] = true;
    printStatus('Show Plug-in!');
  }
 
  function onHidePlugin(e, from, to, msg){ 
    status['plugin'] = false;
    printStatus('Hide Plug-in!');
  }
    
  function onShowWebSite(e, from, to, msg){ 
    status['website'] = true;
    printStatus('Show Web Site!');
  }
    
  function onHideWebSite(e, from, to, msg){ 
    status['website'] = false;
    printStatus('Hide Web Site!');
  }

  var fsminstance = StateMachine.create({
    'initial': 'FullWebSite',
    'events': [
    {'name': 'showmastersite',  'from': 'NoMasterSiteWNavigator',  'to': 'MasterSiteWNavigator'},
    {'name': 'showmastersite',  'from': 'NoMasterSiteNoNavigator',  'to': 'MasterSiteNoNavigator'},
    {'name': 'hidemastersite',  'from': 'MasterSiteWNavigator',  'to': 'NoMasterSiteWNavigator'},
    {'name': 'hidemastersite',  'from': 'MasterSiteNoNavigator',  'to': 'NoMasterSiteNoNavigator'},
    {'name': 'shownavigator',  'from': 'MasterSiteNoNavigator',  'to': 'MasterSiteWNavigator'},
    {'name': 'shownavigator',  'from': 'MasterSiteNoNavigator',  'to': 'MasterSiteWNavigator'},
    {'name': 'hidenavigator',  'from': 'MasterSiteWNavigator',  'to': 'MasterSiteNoNavigator'},
    {'name': 'hidenavigator',  'from': 'NoMasterSiteWNavigator',  'to': 'NoMasterSiteNoNavigator'},
    {'name': 'showplugin',  'from': 'FullWebSite',  'to': 'FullWebSiteWPlugin'},
    {'name': 'showplugin',  'from': 'NoWebSite',  'to': 'NoWebSiteWPlugin'},
    {'name': 'hideplugin', 'from': 'FullWebSiteWPlugin', 'to': 'FullWebSite'},
    {'name': 'hideplugin', 'from': 'NoWebSiteWPlugin', 'to': 'NoWebSite'},
    {'name': 'showwebsite',  'from': 'NoWebSite',  'to': 'FullWebSite'},
    {'name': 'hidewebsite',  'from': 'FullWebSiteWPlugin',  'to': 'NoWebSiteWPlugin'},
    {'name': 'showwebsite', 'from': 'NoWebSiteWPlugin', 'to': 'FullWebSiteWPlugin'},
    {'name': 'hidewebsite', 'from': 'FullWebSite', 'to': 'NoWebSite'}
    ],
    'callbacks': {
    'showmastersite': onShowMasterWebSite,
    'hidemastersite': onHideMasterWebSite,
    'shownavigator': onShowNavigator,
    'hidenavigator': onHideNavigator,
    'onshowplugin':  onShowPlugin,
    'onhideplugin':  onHidePlugin,
    'onshowwebsite': onShowWebSite,
    'onhidewebsite': onHideWebSite
    }
})
  
  calculateComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
  var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
  showHeights(prevTotalHgt, totalHgt);
  prevTotalHgt = totalHgt;
  var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
  $scope.innerTblHeight = colHgt + hgtComponents.idSiteTopRow + hgtComponents.idFooter;
  $scope.bodyColHeight = colHgt;
  $scope.wrapperHeight = getDocHeight() - totalHgt; // - hgtComponents.idFooter;
  $scope.childSiteHeight = getDocHeight() - totalHgt  + getElemHeight("idNavigator") + 
    getElemHeight("idSiteTopRow") + getElemHeight("idFooter");
  $scope.mapColWidth = $scope.ExpandSite == "Show WebSite" ? "100%" : "inherit";
  
  $scope.presidents = presidentList;
  $scope.currentTab = currentSelectedTab;
  $scope.positionView = posView;
  $scope.viewOptions = viewOpts;
  $scope.currentViewOption = $scope.viewOptions[2];
  
  $scope.expBtnHeight = getButtonHeight();
  
  var w = angular.element($window);
  
  w.bind('resize', function () {
     $scope.$apply(windowResized);
  });
  
  function windowResized(){
    calculateComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
    var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
    showHeights(prevTotalHgt, totalHgt);
    prevTotalHgt = totalHgt;
    var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
    $scope.innerTblHeight = colHgt + hgtComponents.idSiteTopRow + hgtComponents.idFooter;
    $scope.bodyColHeight = colHgt;
    $scope.wrapperHeight = getDocHeight() - totalHgt;
    $scope.childSiteHeight = colHgt;
  }
  
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
    console.log(masterSiteHgt);
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
    if($scope.NavigatorVis == "none"){
        totalHgt -= hgtComponents.idNavigator;
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
    if($scope.NavigatorVis == "none"){
        colHgt += hgtComponents.idNavigator;
    }
    return colHgt;
  }
    
  $scope.onExpSumClick = function(){
      $scope.MasterSiteVis = $scope.ExpandSum == "Show Summary" ? "inline" : "none";
      $scope.ExpandSum = $scope.ExpandSum == "Show Summary" ? "Hide Summary" : "Show Summary";
      
      var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
      showHeights(prevTotalHgt, totalHgt);
      prevTotalHgt = totalHgt;
      var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
      $scope.innerTblHeight = colHgt + hgtComponents.idSiteTopRow + hgtComponents.idFooter;
      $scope.bodyColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt;
      $scope.childSiteHeight = colHgt;
  };
  
  $scope.onExpNavClick = function(){
      $scope.NavigatorVis = $scope.ExpandNav == "Show Navigator" ? "flex" : "none";
      $scope.ExpandNav = $scope.ExpandNav == "Show Navigator" ? "Hide Navigator" : "Show Navigator";
      
      var totalHgt = getComponentHeights($scope.MasterSiteVis, $scope.SiteVis);
      showHeights(prevTotalHgt, totalHgt);
      prevTotalHgt = totalHgt;
      var colHgt = getAvailableSiteColumnHeights($scope.MasterSiteVis, $scope.SiteVis);
      $scope.innerTblHeight = colHgt + hgtComponents.idSiteTopRow + hgtComponents.idFooter;
      $scope.bodyColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt;
      $scope.childSiteHeight = colHgt;
  };
  
  $scope.onExpPlugClick = function(){
      $scope.VerbVis = $scope.ExpandPlug == "Show Plugin" ? "flex" : "none";
      $scope.ExpandPlug = $scope.ExpandPlug == "Show Plugin" ? "Hide Plugin" : "Show Plugin";
      
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
      $scope.bodyColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt;
      $scope.childSiteHeight = colHgt;
  };
  $scope.onExpSiteClick = function(){
      $scope.SiteVis = $scope.ExpandSite == "Show WebSite" ? "flex" : "none";
      $scope.ExpandSite = $scope.ExpandSite == "Show WebSite" ? "Hide WebSite" : "Show WebSite";
      $scope.mapColWidth = $scope.ExpandSite == "Show WebSite" ? "100%" : "inherit";
      
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
      $scope.bodyColHeight = colHgt;
      $scope.wrapperHeight = getDocHeight() - totalHgt;
      $scope.childSiteHeight = getDocHeight() - totalHgt;
  };
});