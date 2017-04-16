angular.module("myApp",[])
.controller("myData",function($scope,$http){
	var obj,arr=[];
    $http.get('/allData').then(function(d){ //to get all data ...
       obj=d;
       for(var k in obj){
       	arr.push(k)
       }
       console.log(d)
      $scope.data=arr;
         $scope.sec1=d.data['Pharmaceutical']; // take just hotel data ...
         $scope.sec2=d.data['Medical Equipment'];
         $scope.sec3=d.data['Laboratory Product'];
         $scope.sec4=d.data['Medical Disposable and Consumable'];
         $scope.sec5=d.data['Nutrition and Cosmetic'];
    })
})