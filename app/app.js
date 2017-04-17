/**
 * Created by dashanu on 15/2/17.
 */
'use strict';

angular.module('appModule', []);

angular.module('appModule')
    .directive('myDir1', function(){
        return{
            controller: '@', //value of attribute
            scope: true
        };
    })
    .directive('myDir2', function(){
        return{
            require: ['^^myDir1'], // ^^ Angular will search in the parent for the required directives
            link: function(scope, iElement, iAttrs, ctrl){
                iElement.text(ctrl[0].sharedVar);
            }
        }
    })
    .controller('myCtrl', ['$scope', '$parse', function($scope, $parse){
        $scope.msg = "Hello World";
        this.sharedVar = 'Shared Variable';
        this.getSharedVar = function(){
            return this.sharedVar;
        }
        let fn = $parse('sharedVar'); // $parse returns a function
        console.log(fn(this));    // runs the expression, fn returns value of expressions parsed,
    }])
    .controller('myCtrl1', ['$scope', '$parse', function($scope, $parse){

        this.addToCart = function(){
            console.log("added to checkout");
            return 'Checkout';
        };

        this.checkOut = function(){
            console.log("Do checkout...");
        };
    }])
    .directive('btnP1', ['$parse', function($parse){

        return {
            require: ['^^ngController'],
            link: function(scope, iElement, iAttrs, ctrl){

                let thisAttrVal = iAttrs['btnP1'];

                let callBacksExps = [];

                callBacksExps = thisAttrVal.substring(1, thisAttrVal.length-1).split(',');

                console.log(callBacksExps[1].trim());

                iElement.on('click', (event)=>{

                    let fn = $parse(callBacksExps[0].trim())(ctrl[0]);

                    iElement.text(fn);

                    iElement.off('click');

                    iElement.on('click', (event)=>{

                       let fn = $parse(callBacksExps[1].trim())(ctrl[0]);

                    });
                });
            }
        };

    }])
    .directive('myDir4', [function(){
        return{
            controller: ['$scope', function($scope){
                this.msg = 'Controller of directive';
            }],
            controllerAs: 'ctrl'// ctrl is property on scope of this directive which is a reference to this controller
        };
    }])
    .directive('myDir5', [function(){
        return {
            bindToController: true, // scope properties are bound to controller properties
            controller: function(){
                this.$onInit = function(){
                    this.msg = 'This is controller property';
                }
            }
        }
    }])
    .directive('myDir6', [function(){
        return{
          scope: {             // isolate scope properties always derived from the values of attributes of directive's element
              msg: '@message' // binds scope property msg to value of DOM attribute
          }
        };
    }]);
