"use strict";
(function(){

function couponsController($scope, Coupon, $stateParams, $window, AdminService, notify) {
  console.log("working in coupons");
  var self = this;
  self.coupons = [];
  self.concursos = [];//to bring the list of concursos

  self.addCoupon = addCoupon;
  self.saveEditCoupon = saveEditCoupon;
  self.editCoupon = editCoupon;
  self.deleteCoupon = deleteCoupon;
  self.searchCouponConcurso = searchCouponConcurso;

  self.newcoupon = {
    "grade":"1"
  }

  function addCoupon(){
    console.log(self.newcoupon);
    Coupon.create(self.newcoupon).then(function(data){
      console.log(data);
      UIkit.modal("#addCoupon").hide();
      notify('Cupón añadido exitosamente');
      self.coupons.push(data.data);
    })
  }

  function saveEditCoupon(){
    console.log(self.editcoupon);
    Coupon.update(self.editcoupon).then(function(data){
      console.log(data);
      UIkit.modal("#editCoupon").hide();
      notify('Cupón editado exitosamente');
    })
  }

  function editCoupon(coupon){
    self.editcoupon = coupon
    self.editcoupon.grade = self.editcoupon.grade.toString();
  }

  function deleteCoupon(coupon,index){
    Coupon.delete(coupon).then(function(data){
      console.log(data);
      self.coupons.splice(index,1);
      notify('Cupón elimado exitosamente');
    })
  }


  function searchCouponConcurso(concursoCode){

    console.log("TOCHI searchCouponConcurso  step 1");
    
    
       Coupon.findCouponByConcurso(concursoCode).then(function(data){
         console.log("TOCHI searchCouponConcurso  step 2");
         self.coupons = data.data;
      console.log("TOCHI searchCouponConcurso  step 3");
     })
                   
    console.log("TOCHI searchCouponConcurso  step 4");
  }
  
  
    function traeListaConcurso(){

       console.log("TOCHI traeListaConcurso  step 1");
    
      Coupon.getAllConcursos().then(function(concursos){  //to bring the list of concursos
        console.log("TOCHI traeListaConcurso  step 1.1");
        console.log(concursos);
        self.concursos = concursos.data;
        console.log("TOCHI traeListaConcurso  step 1.2");
      })
                   
       console.log("TOCHI traeListaConcurso  step 2");
  }


  Coupon.getAll().then(function(data){
    self.coupons = data.data;
  })
  
  Coupon.getAllConcursos().then(function(concursos){  //to bring the list of concursos
    console.log("TOCHI getAllConcursos  step 1");
    console.log(concursos);
    self.concursos = concursos.data;
    console.log("TOCHI getAllConcursos  step 2");
  })
  
  

}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coupons', {
        url: '/coupons',
        templateUrl: '/admin/coupons/coupons.html',
        controller: couponsController,
        controllerAs : "couponsController"
      });
  });

})();
