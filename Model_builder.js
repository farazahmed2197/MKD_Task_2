const FS = require("fs");

let configuration = require("./configurations.json");

const build = () => {
  console.log("\n========= Build Start ==============\n\n");
  configuration.model.forEach((m) => buildModel(m));
  // writeFile("demo.txt", "Foo bar!")
};

const buildModel = async (modelDetail) => {
  try {
    console.log(
      `\n========= Building Model ${modelDetail.name} ==============\n`
    );
    let modelFileText = "";
    let modelName = modelDetail.name;
    let librariesRequire =
      "const { DataTypes, Model } = require('sequelize');\nconst sequelize = require('../../dbConnect')\n\n";
    modelFileText = modelFileText.concat(
      `//Auto Generated Sequelize Model\n\n`
    );
    modelFileText = modelFileText.concat(librariesRequire);
    modelFileText = modelFileText.concat(
      `class ${modelName} extends Model {}\n\n`
    );
    modelFileText = modelFileText.concat(`${modelName}.init({\n`);
    for await (let field of modelDetail.field) {
      //field = [name, type, label, validation]
      modelFileText = modelFileText.concat(`${field[0]}:{\n`);
      modelFileText = modelFileText.concat(`type: ${getDataType(field[1])},\n`);
      modelFileText = modelFileText.concat(`allowNull: ${getValidation(field[3])},\n`);
      if(field[0] == "id") modelFileText = modelFileText.concat(`primaryKey: true,\n`);
      modelFileText = modelFileText.concat(`},\n`);
    }
    modelFileText = modelFileText.concat(`},\n`);
    modelFileText = modelFileText.concat(`{
        sequelize,
        modelName: '${modelName}',
    });\n`);

    modelFileText = modelFileText.concat(`module.exports = ${modelName};\n`);

    console.log(modelFileText);
    FS.writeFile(`release/models/${modelName}.js`, modelFileText, (err) => {
      if (err) console.log(err);
      else console.log("\n=== Model Saved! ====\n")
    });
  } catch (error) {
    console.log(error);
  }
};

const getDataType = (type) => {
  if (type == "integer") return "DataTypes.INTEGER";
  if (type == "string") return "DataTypes.STRING";
};

const getValidation = (validation) => {
  if (validation == "required") return "false";
  else return "true";
};

build();
