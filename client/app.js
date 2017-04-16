angular.module("myApp",[])
.controller("myData",function($scope,$http){
  var arr=[];
    $http.get('/allData').then(function(d){ //to get all data ...
  
        $scope.sec1=d.data['Pharmaceutical'][0].data;
        
        $scope.sec2=d.data['Medical Equipment'];
        
        $scope.sec3=d.data['Laboratory Product'];
        
        $scope.sec4=d.data['Medical Disposable and Consumable'];
       
        $scope.sec5=d.data['Nutrition and Cosmetic'];
          
    })
   
})