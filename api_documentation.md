#mealdotnext API documentation


##API endpoints
--------------------------------------------------------------

###User
####Get All of a User
Method: GET
Path: /api/user/"userId"
Input: userId through the url
Response: Object of the User with the resolved Recipe objects in mealsObjs and pastMealsObjs

####Signup new User
Method: POST
Path: /api/user/
Input: JSON with properties username and password
Response: ObjectId of the new User

--------------------------------------------------------------

###Meals
####Create a Meal
Method: POST
Path: /api/meal/
Input: JSON with properties userId and recipeId
Response: 200 and 'Meal saved'

####Delete a Meal
Method: DELETE
Path: /api/meal/"mealId"
Input: mealId through the url
Response: 200 and 'Meal deleted'

####Eat a Meal / change it to past Meals
Method: PUT
Path: /api/meal/"mealId"
Input: mealId through the url
Response: 200 and 'Meal eaten'

####Update haveIngridients of Meal
Method: PUT
Path: /api/meal/
Input: JSON with property haveIngridient
Response: 200 and updated meal object

--------------------------------------------------------------




