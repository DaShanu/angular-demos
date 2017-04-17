/**
 * Created by dashanu on 16/2/17.
 */
'use strict';

angular.module('appModule', []);

angular.module('appModule')
    .controller('appCtrl', ['$scope', function($scope){
        $scope.msg = 'Hello World';
        $scope.object = {
            name: 'Shrey',
            age: '25'
        }
        $scope.sent = '';
        $scope.value = 'This is value from parent scope';


    }])
    .directive('myDir', [function(){
        return {
            template: '{{msg}}',
            scope: {                    // isolate scope properties always derived from attributes on the directive's element
                msg: '@'               // binds scope property msg to value of DOM attribute which is evaluated as a string
            }
        };
    }])
    .directive('myDir1', [function(){
        return{
            template: '<span>Isolated scope message </span><h3>{{msg}}</h3> <p>Isolated scope object {{obj.name}} {{obj.age}}</p> <button ng-click="change()">Change</button><button ng-click="changeMsg()">Change msg</button>',
            scope:{
                obj: '<object',      // one way binds property obj to value of DOM attribute object
                                    // value of attribute is treated as expression evaluated in context of parent scope

                msg: '<msg'          // one way binds property msg to value of DOM attribute msg
                                    // value of attribute is treated as expression evaluated in context of parent scope
            },
            controller: ['$scope', function($scope){
                $scope.change = function(){
                    $scope.obj.name = 'Monika';
                };
                $scope.changeMsg = function(){
                    $scope.msg = 'Hello Universe';
                }
            }]
        }
    }])
    .directive('myDir2', [function(){
        return{
            template: '<textarea ng-model="sentence"></textarea><button ng-click="append(sentence)">Append</button>',
            scope: {
                sent: '&sent'       // binds property 'sent' to a function wrapping the value of attribute as an expression
                                    // so property 'sent' becomes a method on isolated scope and that method containes
                                    // the expression (value of attribute ) which will be evaluted against parent scope
                                    // this method is called.
            },
            controller: ['$scope', function($scope){
                $scope.append = function(sent){
                  $scope.sent({sent: sent});        // You can pass an object hash which contains values of local variable
                                                    //  in the method
                  $scope.sentence = undefined;
                }

            }]
        };
    }])
    .directive('myDir3', [function(){
        return {
            scope: {},

            controller: function(){},
            template: '<p>The value in scope is {{value}}</p>'
        };
    }])
    .directive('myDir4', [function(){
       return {
           scope: {
               value: '='
           },
           bindToController: true,              // this binds property to controller.
                                                // this says that the 'value' property is now a property of controller
                                                // not a property of scope. There's no property on scope now.
                                                // Make it a property of controller.
                                                // bind this property to controller.

           controller: ['$scope', function($scope){
               console.log(this.value);
               console.log('--------------------------');
               console.log('And the scope property value is '+$scope.value);
                                                // there's no 'value' property on scope now
           }],
           controllerAs: '$ctrl',
           template: '<p>The scope property is bind to controller property and value is {{$ctrl.value}}</p>' +
                        '<p>And the scope property is equal to {{value}}</p>' // no value property on scope object
       };
    }]);
