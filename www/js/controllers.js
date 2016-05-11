angular.module('starter.controllers', [])

// .controller('AppCtrl', function($scope, $http, $ionicModal, $timeout) {
// .controller('AppCtrl', function($scope, $ionicModal, $timeout) {
.controller('AppCtrl', function($scope, $ionicModal, $timeout, UserService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
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
  $scope.doLogin = function(callback) {
    console.log('Doing login', $scope.loginData);
    UserService.addUsername($scope.loginData.username);
    console.log(UserService.getUsername());

    PDK.login({scope : 'read_public, write_public'}, callback);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

})

// .controller('CollectionCtrl', function($scope, $http) {
//   $http.get("https://api.pinterest.com/v1/boards/amyilyse/interiors/pins/?access_token=AX0EL2K3PBu3ZineycN4SYBiZiahFEsiwPji579DEIReRwBBUQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution").then(function(response){
//     console.log(response.data.data);
//     $scope.items = response.data.data;
//   });
//   // $scope.playlists =CollectionCtrl [
//   //   { title: 'Reggae', id: 1 },
//   //   { title: 'Chill', id: 2 },
//   //   { title: 'Dubstep', id: 3 },
//   //   { title: 'Indie', id: 4 },
//   //   { title: 'Rap', id: 5 },
//   //   { title: 'Cowbell', id: 6 }
//   // ];
// })

// .controller('PlaylistsCtrl', function($scope, $http) {
//   $http.get("https://api.pinterest.com/v1/boards/amyilyse/interiors/pins/?access_token=AX0EL2K3PBu3ZineycN4SYBiZiahFEsiwPji579DEIReRwBBUQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution").then(function(response){
//     console.log(response.data.data);
//     $scope.items = response.data.data;
//   });

//   $scope.closeImport = function() {
//     $scope.importModal.hide();
//   };

//   // Open the login modal
//   $scope.import = function() {
//     $scope.importModal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doImport = function() {
//     console.log('Doing Import', $scope.importData);
//     $http.get("https://api.pinterest.com/v1/boards/"+$scope.importData.username+"/"+$scope.importData.boardname+"/pins/?access_token=Ac5HCX-jeHtTBqSZE87_3Hy7xmATFEs87BUzGXtDEIReRwBBUQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution%2Cmetadata%2Cmedia%2Ccounts%2Ccolor%2Coriginal_link").then(function(response){
//         console.log(response.data.data);
//         $scope.items = response.data.data;
//         for(i=0;i< $scope.items.length;i++){
//           ItemService.addItem($scope.items[i]);
//         }
//       } 
//     );

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeImport();
//     }, 1000);
//   };

//   // console.log($scope.importData)

  
//   // $scope.playlists = [
//   //   { title: 'Reggae', id: 1 },
//   //   { title: 'Chill', id: 2 },
//   //   { title: 'Dubstep', id: 3 },
//   //   { title: 'Indie', id: 4 },
//   //   { title: 'Rap', id: 5 },
//   //   { title: 'Cowbell', id: 6 }
//   // ];
// })


.controller('CollectionCtrl', function($scope, $ionicModal, $timeout, $http, $stateParams, ItemService, CollectionService) {

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;
  $scope.showHeaderBar = true;
  $scope.collectionId = $stateParams.collectionId;
  $scope.items = ItemService.getItems($stateParams.collectionId);
  console.log($scope.items);
  $scope.importData = {}
  $scope.reload = function() {
    $scope.items = ItemService.getItems($stateParams.collectionId);
    console.log($scope.items);
  }
  $ionicModal.fromTemplateUrl('templates/import.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.importModal = modal;
  });

  $scope.closeImport = function() {
    $scope.importModal.hide();
  };

  // Open the import modal
  $scope.import = function() {
    $scope.importModal.show();
  };

  // Perform the import action when the user submits the import form
  $scope.doImport = function() {
    //TODO: Implement http get to get all subsequent items, only gets 25 
    $http.get("https://api.pinterest.com/v1/boards/"+$scope.importData.username+"/"+$scope.importData.boardname+"/pins/?access_token=Ac5HCX-jeHtTBqSZE87_3Hy7xmATFEs87BUzGXtDEIReRwBBUQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution%2Cmetadata%2Cmedia%2Ccounts%2Ccolor%2Coriginal_link").then(function(response){
        CollectionService.addCollection(response.data.data);
        $scope.items = response.data.data;
        for(i=0;i< $scope.items.length;i++){
          ItemService.addItem($stateParams.collectionId, $scope.items[i]);
        }
      } 
    );
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeImport();
      $scope.importData = {};
      $scope.showHeaderBar = true;
    }, 1000);
  };

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
})


.controller('CollectionsCtrl', function($scope, $http, $state, $ionicPopup, $ionicModal, UserService, CollectionService, ItemService) {
  $scope.loginData = {};
  $scope.collections = CollectionService.getCollections();
  $scope.importData = {};
  $scope.importResult = {};

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
    UserService.addUsername($scope.loginData);
    console.log(UserService.getUser());
  };


  $ionicModal.fromTemplateUrl('templates/import.html', {
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
  };

  // Perform the login action when the user submits the login form
  $scope.doImport = function() {
    //console.log('Doing Import', $scope.importData);
    //TODO: Implement http get to get all subsequent items, only gets 25 
    $http.get("https://api.pinterest.com/v1/boards/"+$scope.importData.username+"/"+$scope.importData.boardname+"/pins/?access_token=Ac5HCX-jeHtTBqSZE87_3Hy7xmATFEs87BUzGXtDEIReRwBBUQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution%2Cmetadata%2Cmedia%2Ccounts%2Ccolor%2Coriginal_link").then(function(response){
        angular.extend($scope.importResult, response.data);
        $scope.items = response.data.data;
        for(i=0;i< $scope.items.length;i++){
          ItemService.addItem($scope.importResult.id, $scope.items[i]);
        }
        $scope.closeImport();
      } 
    ).then($http.get("https://api.pinterest.com/v1/boards/"+$scope.importData.username+"/"+$scope.importData.boardname+"/?access_token=Ac5HCX-jeHtTBqSZE87_3Hy7xmATFEs87BUzGXtDEIReRwBBUQAAAAA&fields=id%2Curl%2Cname%2Ccreator%2Cimage").then(function(response){
      angular.extend($scope.importResult, response.data.data);
    })
    ).then(function() {
      CollectionService.addCollection($scope.importResult);
      $scope.collections = CollectionService.getCollections();
      $scope.importResult = {};
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
   }
 }
})
.service('UserService', function() {
 return {
   user: {},
   getUser: function() {
      return this.user;
   },
   addUsername: function(user) {
      this.user = user;
   }
 }
})
;


