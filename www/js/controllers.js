angular.module('starter.controllers', [])

// .controller('AppCtrl', function($scope, $http, $ionicModal, $timeout) {
// .controller('AppCtrl', function($scope, $ionicModal, $timeout) {
.controller('AppCtrl', function($scope, $ionicModal, $timeout, UserService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicModalnicView.enter', function(e) {
  //});
  // Form data for the login modal
  $scope.loginData = {};

  PDK.init({appId:'4833595787237665566', cookie: true});

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // UserService.addUsername($scope.loginData.username);
    // console.log(UserService.getUsername());

    PDK.login({scope : 'read_public, write_public'}, function(res){
      console.log(res.session.accessToken);
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

})


.controller('CollectionCtrl', function($scope, $ionicModal, $timeout, $http, $stateParams, $ionicScrollDelegate, ItemService, CollectionService) {

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;
  $scope.showHeaderBar = true;
  $scope.collectionId = $stateParams.collectionId;
  $scope.items = ItemService.getItems($stateParams.collectionId);

  console.log($scope.items);

  curr_left_pos = 0;
  curr_right_pos = 0;
  curr_left = true;
  for (var key in $scope.items) {
    console.log($scope.items[key]);
    var img = new Image();
    img.src = $scope.items[key].image.original.url;
    img.onload = function() {
      var y_ratio = Math.round((this.height*1.0)/10);
      // $scope.items[key].size.y = y_ratio
      // angular.extend($scope.items[key], {size_x: 1, size_y: y_ratio});
      // angular.extend($scope.items[key], {size: {x: 40, y: 20}});

      if (curr_left) {
        angular.extend($scope.items[key], {position: [0, curr_left_pos]});
        curr_left_pos +=y_ratio;
      } else {
        angular.extend($scope.items[key], {position: [1, curr_right_pos]});
        curr_right_pos += y_ratio;
      }

      curr_left = !curr_left;
      console.log($scope.items[key].size.y);
      console.log($scope.items[key]);
      console.log(curr_left +" left?| " + curr_left_pos + " right " + curr_right_pos);
    };

      console.log("size.x: " + $scope.items[key].size.x + " | size.y: " + $scope.items[key].size.y);
  }

  $scope.customItemMap = {
      sizeX: '1',
      sizeY: 'item.size_y',
      minSizeY: 'item.size_y',
      maxSizeY: 'item.size_y'
  };


  $scope.collection = CollectionService.getCollection($scope.collectionId);

  $scope.calculateSum = function() {

    sum = 0;
    for (var key in $scope.items) {
      if ($scope.items[key].toggle){
        sum += $scope.items[key].price;
      }
    }

    $scope.totalPrice = sum;
    return sum;
  };
  $scope.totalPrice = $scope.calculateSum();

  $ionicModal.fromTemplateUrl('templates/edit-collection.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.editCollectionModal = modal;
  });

  $scope.updatedCollection = {};

  $scope.hideCollectionEdit = function() {
    $scope.editCollectionModal.hide();
  };

  $scope.showCollectionEdit = function() {
    $scope.editCollectionModal.show();
  };
  $scope.editCollection = function() {
    CollectionService.updateCollection($scope.collection, $scope.updatedCollection);
    $scope.editCollectionModal.hide();
    $scope.updatedCollection = {};
  };

  $scope.holding = false;

  // console.log($scope.importData)

    $scope.data = {
      showDelete: false,
      showReorder: false
    };

    $scope.edit = function(item) {
      alert('Edit Item: ' + item.id);
    };

    $scope.share = function(item) {
      alert('Share Item: ' + item.id);
    };

    $scope.reorderItem = function(item, fromIndex, toIndex) {
      console.log(item,fromIndex,toIndex);
      console.log($scope.items);
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    };

    function dragMoveListener (event) {
      if ($scope.holding) {
        $ionicScrollDelegate.freezeScroll(true);
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    };

    $scope.gridsterOpts = {
    draggable: {
      enabled: false
    },
    columns:2,// the width of the grid, in columns
    pushing: true, // whether to push other items out of the way on move or resize
    floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
    swapping: true, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
    width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
    colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
    rowHeight: '31', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
    margins: [10, 10], // the pixel distance between each widget
    outerMargin: true, // whether margins apply to outer edges of the grid
    isMobile: false, // stacks the grid items if true
    mobileBreakPoint: 100, // if the screen is not wider that this, remove the grid layout and stack the items
    mobileModeEnabled: false, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
    minColumns: 1, // the minimum columns the grid must have
    minRows: 1, // the minimum height of the grid, in rows
    maxRows: 100000,
    defaultSizeX: 1, // the default width of a gridster item, if not specifed
    defaultSizeY: 1, // the default height of a gridster item, if not specified
    minSizeX: 1, // minimum column width of an item
    maxSizeX: null, // maximum column width of an item
    minSizeY: 1, // minumum row height of an item
    maxSizeY: null, // maximum row height of an item
    resizable: {
       enabled: false,
       handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
       start: function(event, $element, widget) {}, // optional callback fired when resize is started,
       resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
       stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
    }
};

$scope.toggleDraggable = function() {
  $scope.gridsterOpts.draggable.enabled = !$scope.gridsterOpts.draggable.enabled;
  return;
};

$scope.dragToggled = function(item){

}

////////////////////////////
//  Push and Hold  //
////////////////////////////
$scope.isShortActionDone = false;
$scope.onHoldShortStart = function($event, $promise) {

  if (!$scope.gridsterOpts.draggable.enabled) {
    $promise.then(function(success){
      // Called if the button was held long enough
      console.log("Push and Hold was successful");
      $scope.isShortActionDone = !$scope.isShortActionDone;

      $scope.toggleDraggable();
      var result = $event.stopPropagation();

    }, function(reason){
      // Called if the button is not held long enough
      console.log("Tally item was not held down for long enough");

    }, function(update){

      // Called multiple times before the promise is confirmed or rejected
      // console.log("Tally item being held down...");
      
    })
  } else {
    $event.stopPropagation();
  }

    return;

  };

    window.dragMoveListener = dragMoveListener;

})

.controller('LoginCtrl', function($scope, $http, $state, $ionicPopup, $ionicModal, $timeout, UserService){
  $scope.loginData = {};
  $scope.signUpData = {};

  //Initialize the Pinterest SDK
  PDK.init({appId:'4833595787237665566', cookie: true});
  // var accessToken;
  // var pinterestUsername;

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/sign-up.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.signUpModal = modal;
  });

  $scope.closeSignUp = function(){
    $scope.signUpModal.hide();
  };

  $scope.signUp = function(){
    $scope.signUpModal.show();
  }

  $scope.doSignUp = function () {
    console.log('Doing signUp', $scope.signUpData);
    PDK.login({scope : 'read_public, write_public'}, function(res){
      console.log(res.session.accessToken);
      new_user = {
        "username" : $scope.signUpData.username,
        "password" : $scope.signUpData.password,
        "access_token" :  res.session.accessToken
      };
      $http.post("http://45.55.146.198:3002/users", new_user).success(function(resp){
        alert("Success Creating a new User");
        UserService.setToken(resp.user.pinterest);
        UserService.setCookie(resp.session.session_key);
        // console.log(UserService.cookieSet());
        UserService.addUsername($scope.signupData);
        $timeout(function(){
            $state.go('app.collections');
        }, 0);
        $scope.signUpModal.hide();
      });
    });
  }

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    var usr = {
      "username" : $scope.loginData.username,
      "password" : $scope.loginData.password
    };

    $http.post("http://45.55.146.198:3002/login", usr).success(function(resp){
      // console.log(resp);
      UserService.setToken(resp.user.pinterest);
      UserService.setCookie(resp.session.session_key);
      UserService.addUsername($scope.loginData);
      // console.log("token : " + accessToken);
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);

      $timeout(function(){
          $state.go('app.collections');
      }, 0);


      // $http.defaults.headers.common['Authorization'] = resp.session.session_key;
      //
      // $http.get("http://45.55.146.198:3002/collections").success(function(res){
      //   console.log(res);
      // });

    })
    .error(function(err){
      alert("login error");
    });
  }

})

.controller('CollectionsCtrl', function($scope, $http, $state, $ionicPopup, $ionicModal, $timeout, $state, UserService, CollectionService, ItemService, fooSvc) {
  $scope.collections = CollectionService.getCollections();
  $scope.importData = {};
  $scope.importResult = {};

  // Initialize the Pinterest SDK
  PDK.init({appId:'4833595787237665566', cookie: true});
  var pinterestUsername;

  $scope.setPrice = function(item) {

    console.log(item);
    var priceMatch = false;
    var priceToggle = false;
    if (item.metadata.hasOwnProperty('product')){
      if (item.metadata.product.hasOwnProperty('offer')) {
        if (item.metadata.product.offer.hasOwnProperty('price')) {
          priceMatch = item.metadata.product.offer.price.match(/[\$\£\€\¥](\d+(?:\.\d{1,2})?)/);
        } else if (item.metadata.product.offer.hasOwnProperty('max_price')) {
          priceMatch = item.metadata.product.offer.max_price.match(/[\$\£\€\¥](\d+(?:\.\d{1,2})?)/);
        } else if (item.metadata.product.offer.hasOwnProperty('min_price')) {
          priceMatch = item.metadata.product.offer.min_price.match(/[\$\£\€\¥](\d+(?:\.\d{1,2})?)/);
        }
      }
    } else {
      //TODO: parse the item description for price
      priceMatch = item.note.match(/[\$\£\€\¥](\d+(?:\.\d{1,2})?)/);
    }

    if (priceMatch) {
      detectedCurrency = priceMatch[0].substring(0, 1);
      priceValue = Number(priceMatch[1]);
      priceToggle = true;
    } else {
        detectedCurrency = false;
        priceValue = false;
    }

    angular.extend(item, {price: priceValue, toggle: priceToggle});
    return item;
  };

  $scope.setSize = function(item) {
    var height = item.image.original.height;
    var width = item.image.original.width;



    if (item.price != false) {
      height = Math.round(((height) * 6.0)/width) + 2;
    } else {
      height = Math.ceil(((height) * 6.0)/width);
    }
    console.log("height: " + height);

    angular.extend(item, {size: {x: 1, y: height}});
    console.log("set height in set size: " + item.size.y);
    return item;
  };

  $scope.hasPrice = function(item) {

    if (item.price) {
      return true;
    } else {
      return false;
    }
  };

  $scope.formatPrice = function(item) {

    var priceStr;

    // TODO: get this value from the actual detected currency
    var detectedCurrency = "$";

    if (!item.price) {
      priceStr = " ";
    } else {
      priceStr = detectedCurrency + " " + Math.round(item.price);
    }

    return priceStr;
  };

  $ionicModal.fromTemplateUrl('templates/board-list.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.importModal = modal;
  });

  $scope.closeImport = function() {
    $scope.importModal.hide();
  };

  // Open the login modal
  $scope.import = function() {
    $scope.importModal.show();
    console.log(UserService.getToken());
    $http.get("https://api.pinterest.com/v1/me/boards/?access_token="+UserService.getToken()+"&fields=id%2Cname%2Curl").success(function(resp){
      console.log(resp);
      $scope.boards = resp.data;
    });
    $http.get("https://api.pinterest.com/v1/me/?access_token="+UserService.getToken()+"&fields=url%2Cusername").success(function(resp){
      console.log(resp);
      pinterestUsername = resp.data.username;
    });
  };

  // Perform the login action when the user submits the login form
  $scope.doImport = function(idx) {
    //console.log('Doing Import', $scope.importData);
    $scope.loading=true;
    console.log(idx);
    console.log($scope.boards[idx]);

    //TODO: Implement http get to get all subsequent items, only gets 25
    $http.get("https://api.pinterest.com/v1/boards/"+pinterestUsername+"/"+$scope.boards[idx]["name"]+"/pins/?access_token="+UserService.getToken()+"&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution%2Cmetadata%2Cmedia%2Ccounts%2Ccolor%2Coriginal_link").then(function(response){
        angular.extend($scope.importResult, response.data);
        // $scope.items = response.data.data;
        id = $scope.importResult.id;
        console.log(id);
        fooSvc.getPins(pinterestUsername, $scope.boards[idx]["name"]).then(function(data){
          // console.log(data[1]);
          $scope.items = data;

          console.log("after recursive function");
          console.log(response.data.data[1]);
          for(i=0;i< $scope.items.length;i++){
            currentItem = $scope.items[i];
            currentItem = $scope.setPrice(currentItem);
            currentItem = $scope.setSize(currentItem);
            console.log(id);
            ItemService.addItem(id, currentItem);
          }
          // console.log(ItemService.getItems(id));
          // $scope.errorInfo = "";
          $scope.closeImport();
          // console.log($scope.items)
        });
      }
    ).then($http.get("https://api.pinterest.com/v1/boards/"+pinterestUsername+"/"+$scope.boards[idx]["name"]+"/?access_token="+UserService.getToken()+"&fields=id%2Curl%2Cname%2Ccreator%2Cimage").then(function(response){
      angular.extend($scope.importResult, response.data.data);
    })
    ).then(function() {
      console.log($scope.importResult);
      CollectionService.addCollection($scope.importResult);
      $scope.collections = CollectionService.getCollections();
      $scope.importResult = {};
    }).finally(function(){
      $scope.loading = false;
    });
  };

  //Import a board using username and boardname
  $ionicModal.fromTemplateUrl('templates/import.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.import2Modal = modal;
  });

  $scope.closeImport2 = function() {
    $scope.import2Modal.hide();
  };

  $scope.import2 = function() {
    $scope.import2Modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doImport2 = function() {
    console.log('Doing Import', $scope.importData);
    $scope.loading = true;

    //TODO: Implement http get to get all subsequent items, only gets 25
    $http.get("https://api.pinterest.com/v1/boards/"+$scope.importData.username+"/"+$scope.importData.boardname+"/pins/?access_token=AWiy0JuQcyVwU19tSF9GtYreXHk5FE9B4q-TuMZDFRg1dYBCcAAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution%2Cmetadata%2Cmedia%2Ccounts%2Ccolor%2Coriginal_link").then(function(response){
        // console.log($scope.importData)
        console.log("response: ");
        console.log(response);
        angular.extend($scope.importResult, response.data);
        id = $scope.importResult.id;
        console.log(id);
        fooSvc.getPins($scope.importData.username, $scope.importData.boardname).then(function(data){
          // console.log(data[1]);
          $scope.items = data;

          console.log("after recursive function");
          console.log(response.data.data[1]);
          for(i=0;i< $scope.items.length;i++){
            currentItem = $scope.items[i];
            currentItem = $scope.setPrice(currentItem);
            currentItem = $scope.setSize(currentItem);
            console.log(id);
            ItemService.addItem(id, currentItem);
          }
          console.log(ItemService.getItems(id));
          $scope.errorInfo = "";
          $scope.closeImport2();
          // console.log($scope.items)
        });
      }
    ).then($http.get("https://api.pinterest.com/v1/boards/"+$scope.importData.username+"/"+$scope.importData.boardname+"/?access_token=AWiy0JuQcyVwU19tSF9GtYreXHk5FE9B4q-TuMZDFRg1dYBCcAAAAAA&fields=id%2Curl%2Cname%2Ccreator%2Cimage").then(function(response){
      angular.extend($scope.importResult, response.data.data);
      // if (response.page.next){
      //   console.log("**************");
      // }
    })
    ).then(function() {
      console.log("test");
      console.log($scope.importResult);
      CollectionService.addCollection($scope.importResult);
      $scope.collections = CollectionService.getCollections();
      $scope.importResult = {};
    }).finally(function(){
      $scope.loading = false;
    });
    $http.get("https://api.pinterest.com/v1/boards/"+$scope.importData.username+"/"+$scope.importData.boardname+"/pins/?access_token=AWiy0JuQcyVwU19tSF9GtYreXHk5FE9B4q-TuMZDFRg1dYBCcAAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution%2Cmetadata%2Cmedia%2Ccounts%2Ccolor%2Coriginal_link").error(function(response){
      $scope.loading = false;
      $scope.errorInfo = "Username or BoardName Not Correct";
      console.log("afd");
    //  alert("Username ");
    });
  };

  //TODO: shouldn't need this anymore
  $scope.addCollectionFromPinterest = function(){

    $scope.data={};
    var addPopup = $ionicPopup.show({
      templateUrl: 'templates/addCollection.html',
      title: 'Add Collection From Pinterest',
      subTitle: 'Input User and Board Name',
      scope: $scope,

      buttons: [
      { text: 'Cancel' }, {
        text: '<b>Add</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.addUser || !$scope.data.addBoard) {
            console.log("No Add Info");
            //don't allow the user to close unless he enters model...
            e.preventDefault();
          } else {

            $http.get("https://api.pinterest.com/v1/boards/" + $scope.data.addUser + "/" + $scope.data.addBoard + "/?access_token=AX0EL2K3PBu3ZineycN4SYBiZiahFEsiwPji579DEIReRwBBUQAAAAA&fields=id%2Curl%2Cname%2Ccreator%2Cimage").then(function(response){
              console.log(response.data.data);
              $scope.collections.push(response.data.data);
              console.log("Added Collection: " + response.data.data.name);
            });

          }
        }
      }]
    });

    addPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };


  //TODO: shouldn't need this anymore
  $scope.viewCollection = function(id) {
    $state.go('app.collection/'+id);
  }

})

.controller('ItemCtrl', function($scope, $stateParams, $ionicModal, ItemService) {

  $scope.itemId = $stateParams.itemId;
  $scope.itemDetails = ItemService.getItem($stateParams.collectionId, $scope.itemId);
  console.log($scope.itemDetails);
  $ionicModal.fromTemplateUrl('templates/edit-item.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.editModal = modal;
  });

  $scope.updatedItem = {};

  $scope.hideEdit = function() {
    $scope.editModal.hide();
  };

  $scope.showEdit = function() {
    $scope.editModal.show();
  };
  $scope.editItem = function() {
    angular.extend($scope.itemDetails,$scope.updatedItem);
    ItemService.addItem($stateParams.collectionId, $scope.itemDetails);
    $scope.editModal.hide();
    $scope.updatedItem = {};
  }
})

// .controller('InteractCtrl', function($scope){
//   // target elements with the "draggable" class
//   interact('.draggable')
//     .draggable({
//       // enable inertial throwing
//       inertia: true,
//       // keep the element within the area of it's parent
//       restrict: {
//         restriction: "parent",
//         endOnly: true,
//         elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
//       },
//       // enable autoScroll
//       autoScroll: true,

//       // call this function on every dragmove event
//       onmove: dragMoveListener,
//       // call this function on every dragend event
//       onend: function (event) {
//         var textEl = event.target.querySelector('p');

//         textEl && (textEl.textContent =
//           'moved a distance of '
//           + (Math.sqrt(event.dx * event.dx +
//                        event.dy * event.dy)|0) + 'px');
//       }
//     });

//     function dragMoveListener (event) {
//       var target = event.target,
//           // keep the dragged position in the data-x/data-y attributes
//           x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
//           y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//       // translate the element
//       target.style.webkitTransform =
//       target.style.transform =
//         'translate(' + x + 'px, ' + y + 'px)';

//       // update the posiion attributes
//       target.setAttribute('data-x', x);
//       target.setAttribute('data-y', y);
//     }

//     // this is used later in the resizing and gesture demos

//     interact('.dropzone').dropzone({
//       // only accept elements matching this CSS selector
//       accept: '#yes-drop',
//       // Require a 75% element overlap for a drop to be possible
//       overlap: 0.75,

//       // listen for drop related events:

//       ondropactivate: function (event) {
//         // add active dropzone feedback
//         event.target.classList.add('drop-active');
//       },
//       ondragenter: function (event) {
//         var draggableElement = event.relatedTarget,
//             dropzoneElement = event.target;

//         // feedback the possibility of a drop
//         dropzoneElement.classList.add('drop-target');
//         draggableElement.classList.add('can-drop');
//         draggableElement.textContent = 'Dragged in';
//       },
//       ondragleave: function (event) {
//         // remove the drop feedback style
//         event.target.classList.remove('drop-target');
//         event.relatedTarget.classList.remove('can-drop');
//         event.relatedTarget.textContent = 'Dragged out';
//       },
//       ondrop: function (event) {
//         event.relatedTarget.textContent = 'Dropped';
//       },
//       ondropdeactivate: function (event) {
//         // remove active dropzone feedback
//         event.target.classList.remove('drop-active');
//         event.target.classList.remove('drop-target');
//       }
//     });

//     window.dragMoveListener = dragMoveListener;

// })
/*
  items is a map with keys collectionId
  each value of items[collectionId] is a map with keys itemId and values of items
  Each item has the following fields:
    attribution: not sure
    board:
      id: string (id of board)
      name: string
      url: string
    color: string (color hex)
    counts:
      comments: number
      likes: number
      repins: number
    created_at: string (date)
    id: string (unique pin id)
    image:
      original:
        height: number
        url: string
        width: number
    link: string
    media:
      type: string
    // not sure what the metadata is, could be external link
    metadata:
      link:
        description: string
        favicon: string (link to image?)
        locale: string (ie "en")
        site_name: string (link to main site)
        title: string
    note: string (actual description on pin)
    original_link: string (external link to other sites ie tumblr)
    url: string (url to pinterest)

*/

.service('ItemService', function() {
 return {
   items: {},
   getItems: function(collectionId) {
    return this.items[collectionId];
   },
   getItem: function(collectionId, itemId) {
     return this.items[collectionId][itemId];
   },
   addItem: function(collectionId, item) {
    if(!this.items.hasOwnProperty(collectionId)){
      this.items[collectionId] = {};
    }
    if(!this.items[collectionId].hasOwnProperty(item.id)){
      this.items[collectionId][item.id] = {};
    }
    angular.extend(this.items[collectionId][item.id], item);
   }
 }
})


/*
  collections is a map of collectionId to collection objects
  Each collection is stored with the following fields:
    creator:
      first_name: String
      id: String (of numbers I think()
      last_name: String
      url: String to user's page
    data: Array of items, see Item Service
    id: String (I think this is the id of the user the token is connected to)
    image:
      60x60:
        height: number
        url: string
        width: number
    name: string (name of board)
    page:
      cursor: string
      next: url (call for next 25 objects in collection)
    url: string (url to board)
*/
.service('CollectionService', function() {
 return {
   collections: {},
   getCollections: function() {
    return this.collections;
   },
   getCollection: function(collectionId) {
     return this.collections[collectionId];
   },
   addCollection: function(collection) {
    this.collections[collection.id] = collection;
    console.log(this.collections);
   },
   updateCollection: function(oldCollection, newCollection) {
    // this.collections[oldCollection.id] = newCollection;

    for (var key in newCollection) {

      if (oldCollection.hasOwnProperty(key)){
        oldCollection[key] = newCollection[key];
      }

    }
    return this.collections[oldCollection.id];
   }
 }
})
.service('UserService', function() {
 return {
   user: {},
   token: {},
   isAuthed : false,
   getUser: function() {
      return this.user;
   },
   addUsername: function(user) {
      this.user = user;
   },
   setCookie: function(sessionKey){
     this.isAuthed = true;
   },
   cookieSet: function(){
     return this.isAuthed;
   },
   setToken: function(accessToken){
     this.token = accessToken;
   },
   getToken: function(){
     return this.token;
   }
 }
})

.directive('holdButton', function($parse, $q, $interval, $window){
  return {
    restrict: 'A',
    priority: 10,
    link: function postLink(scope, element, attrs) {
      

      angular.element(document).bind('mousedown', function(){
        console.log('clicked down on document');
      });

      angular.element(document).bind('mouseup', function(){
        console.log('clicked up on document');
      });


      var tickDelay = 10;
      scope.$watch('')
      scope.holdShortStyle = {
          'z-index':'300'
        };
      // if (scope.gridsterOpts.draggable.enabled){
      //   angular.extend(scope.holdShortStyle, {'box-shadow':'5px 5px 5px green'});
      // }
      var deferred, stop;
      element.bind('mousedown', function($event) {
        var onHoldStart = $parse(attrs.holdButton);
        var holdDelay = attrs.holdButtonDelay ? ($parse(attrs.holdButtonDelay)(scope) || 400) : 400;
        var counter = 0;
        var nbTick = holdDelay / tickDelay;
        deferred = $q.defer();

        scope.holdShortStyle = {
          'opacity':'0.8'
        };
        if (scope.gridsterOpts.draggable.enabled){
          angular.extend(scope.holdShortStyle, {'box-shadow':'5px 5px 5px grey'});
        }



        // Call onTick fxn 'nbTick' times every 'tickDelay' ms
        // stop is stopper fxn
        stop = $interval(onTick, tickDelay, nbTick);
        function onTick() {
          counter++;
          deferred.notify((counter + 1) / nbTick);
          if (counter === nbTick) {
            deferred.resolve();
          }
        }

        if (typeof onHoldStart == 'function' || false) {

          onHoldStart(scope, {
            $promise: deferred.promise,
            $event: $event
          });
        }

      });
      element.bind('mouseup', function($event) {

        scope.holdShortStyle = {
          'opacity':'1.0',
          'box-shadow':'0px 0px'
        };

        $interval.cancel(stop);


        if (deferred) {
          deferred.reject($event);
        }
      });

    }
  };
})
.factory('fooSvc', function($q, $http){
  function getPinsFrom(url, pins){
    return $http.get(url).then(function(response){
      console.log(response);
      pins = pins.concat(response.data.data);
      if(response.data.page.next){
        return getPinsFrom(response.data.page.next, pins);
      } else {
        return pins;
      }
    });
  }

  return {
    getPins : function(username, boardname){
      return getPinsFrom("https://api.pinterest.com/v1/boards/"+username+"/"+boardname+"/pins/?access_token=AWiy0JuQcyVwU19tSF9GtYreXHk5FE9B4q-TuMZDFRg1dYBCcAAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution%2Cmetadata%2Cmedia%2Ccounts%2Ccolor%2Coriginal_link", []);
    }
  };
});
