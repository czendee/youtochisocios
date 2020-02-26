"use strict";
(function(){

function usersController($scope, Student, $stateParams, $window, AdminService, notify) {
  console.log("working in users");
  var self = this;
  self.users = [];

  self.addUser = addUser;
  self.setEditUser = setEditUser;
  self.editUser = editUser;
  self.deleteUser = deleteUser;

  self.newuser={};

  self.newuser.role="teacher",
  self.newuser.grade="1"

  function setEditUser(user){
    self.edituser = user;
    self.edituser.grade=String(user.grade);
  }

  function deleteUser(user, index){
    AdminService.deleteUser(user).then(function(){
      self.users.splice(index,1);
      notify('Usuario eliminado exitosamente');
    }).catch(function(err){
      notify('Please try again later');
    })
  }

  function editUser(){
    AdminService.editUser(self.edituser).then(function(data){
      console.log(data);
      UIkit.modal("#editUser").hide();
      notify('Usuario editado exitosamente');
    }).catch(function(err){
      notify('Please try again later');
    })
  }

  function addUser(){
    console.log(self.newuser);
    AdminService.addUser(self.newuser).then(function(data){
      console.log(data);
      self.users.push(data.data);
      UIkit.modal("#addUser").hide();
      notify('Usuario añadido exitosamente');
    }).catch(function(err){
      notify('User with this email already exists');
    })
  }

  AdminService.getAllUsers().then(function(users){
    console.log(users);
    self.users = users.data;
  })

}

angular.module('admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: '/admin/users/users.html',
        controller: usersController,
        controllerAs : "usersController"
      });
  });

})();
