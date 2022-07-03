# Context

Revamping
You received a task to refactor and fix an existing code. The code includes a test function to identify and fix the existing bug.

Business rules
There are two types of action: price calculation and price querying.
Price calculation

- The input format is “itemID,quantity,unit”, then separated by “;” for multiple entries
  For example “1,2,kg;3,4,g” means 2 entries, which are:
  Item ID = 1, quantity = 2, unit = kg
  Item ID = 3, quantity = 4, unit = g
- It should look up the item unit price and unit by item ID.
- The price calculation is quantity \* unit price, where both quantity and unit price are in the same unit.
- The price calculation should output the sum of total prices for all entries and round to the nearest 5 cents.

For example:

1.23 should round up to 1.25.
1.27 should round down to 1.25.

Price query

- The input format is “itemID”, separated by “,” for multiple entries
  For example, “1,2” means 2 entries, which are:
  Item ID = 1
  Item ID = 2
- It should look up the item unit price and unit by item ID.
- The price query should output an array of objects, where each object should have property “itemId” for item ID, and “kgPrice” for unit price in kg.
  For example: [
  { “itemId”: 1, “kgPrice”: 1.45 },
  { “itemId”: 2, “kgPrice”: 1.23 },
  ]
- The price query should convert non-kg unit price to kg unit price.
- There are only two units, which are kg and g.
- 1 kg is equal to 1,000 g.
- The item ID should be a number.
- The unit price is at most two decimal places.

This section would test you on:

- Refactoring skills
- Ability to identify code errors
- Write appropriate comment
- Eliminate redundant and unnecessary code

For the second part of this section, if you could reimplement and redesign everything from scratch, how would you implement it?

# Feedback

Former code was going in all places so it was kinda hard to decipher even with the browser console.

### Errors on former code

- *quantity part* : 

![image](https://user-images.githubusercontent.com/44264590/177031478-67dfbbbb-8f5c-4959-8834-a319ce14655c.png)


they multiplied by 1000 instead of dividing it by 100 to find the the right quantity to use with grams

fixing the bug : 


![image](https://user-images.githubusercontent.com/44264590/177031531-82a5824a-288c-457c-8bb1-a3f977b6d8e4.png)


- *query part* : 


![image](https://user-images.githubusercontent.com/44264590/177031023-1b2ade3c-85d9-405d-a799-38a2e08bc9c3.png)


they gave unitPrice to the outputItem instead of kgPrice

fixing the bug : 


![image](https://user-images.githubusercontent.com/44264590/177031111-5439bb33-2712-46b8-998a-b634a260a211.png)


My way to improve it :

- extract data to specific folders
- better use of Typescript to be more readable and understood by others
- extract a maximum of functions to separate files, still in that perspective to have a code more readable
- use of some of ES6 features like :
  - let and const
  - include
  - for/of
  - import modules
  - endsWith
  - array functions
- use explicit name for variables and functions in order to avoid comments
