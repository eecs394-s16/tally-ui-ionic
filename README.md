# tally-ui-ionic

##Environment Setup:

1. install node.js

2. install ionic

`npm install -g cordova ionic`

##Run the app:

  `ionic serve`
  
or

  `ionic run ios`

##Limitations
- Masonry drag and drop functionality (not free form)
- No currency conversions (parses price and shows with $ sign but doesn't actually convert)
- No storage of user data in the backend
- Fixed upper limit of number of pins imported from a given board (default 100)

##Bugs
- Dropping an item between two vertically arranged items does not insert the item in between (pushed down instead)
- Autoscroll doesn't work when dragging items to overflow
