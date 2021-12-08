# MKD_Task_2

## Node Task 2 
    1- Clone repo to your own github
    2- Read the configuration.json
    3- Use https://expressjs.com/
    4- Use this library to connect to mysql https://sequelize.org/
    5- Create release folder
    6- Make a class called Model_builder.js with function build.
    7- In build function, read the configuration.json and make the following for each model:
        add form view page that submit it to an api that save to database for current model

    This need to be done today

Example

configuration.json
field columns are (the field name, the field type, the field label, the validation rule)
{
"model": [
  {
  "name": "location",
  "field: [
    ["id", "integer", "ID", "required"],
    ["name", "string", "Name", "required"],
    ["status", "integer", "Status", "required"],
  ]
  },
  {
  "name": "user",
  "field: [
    ["id", "integer", "ID", "required"],
    ["name", "string", "Name", "required"],
    ["email", "string", "Email", "required"],
    ["status", "integer", "Status", "required"],
  ]
  }
]
}
add view page (you need to generate this from configuration.json. If there are more fields, should generate it)
<form method="POST" action="Thank you for your business! We look forward to working with you again.api/location">
<label>Name</label>
<input type="text" name="name" id="name" value="" required/>
<label>Status</label>
<input type="number" name="status" id="status" value="" required/>
<input type="submit" name="submit" id="submit" value="Submit"/>
</form>

## How to run

# 1
Run the Model_builder.js file by running command npm run build. Files will be created and saved under the release directory.
Models will be saved in release/models/
Routes will be saved in release/routes/
Views will be saved in release/views/

# 2
Start the server by running npm start.

# 3
Open any file in release/views directory and save the data. 