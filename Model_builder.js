const FS = require("fs");
let configuration = require("./configurations.json");

const build = async () => {
  // directories path
  let routesDir = "./release/routes";
  let modelDir = "./release/models";
  let viewDir = "./release/views";

  // create directories if not exists
  createDir(routesDir);
  createDir(modelDir);
  createDir(viewDir);

  console.log("\n========= Build Start ==============\n\n");
  configuration.model.forEach((m) => {
    buildModel(m);
    buildRoutes(m);
    buildView(m);
  });
  await buildRouteIndex();
};

const createDir = (dir) => {
  if (!FS.existsSync(dir)) {
    FS.mkdirSync(dir, { recursive: true });
  }
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
      modelFileText = modelFileText.concat(
        `allowNull: ${getValidation(field[3])},\n`
      );
      if (field[0] == "id")
        modelFileText = modelFileText.concat(
          `primaryKey: true,\nautoIncrement: true,\n`
        );
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
      else console.log("\n=== Model Saved! ====\n");
    });
  } catch (error) {
    console.log(error);
  }
};

const buildRoutes = async (modelDetail) => {
  try {
    console.log(
      `\n========= Building Routes ${modelDetail.name} ==============\n`
    );
    let routeFileText = "";
    let modelName = modelDetail.name;
    let librariesRequire =
      "const express = require('express');\nconst router = express.Router();\n\n";
    routeFileText = routeFileText.concat(`//Auto Generated Express Routes\n\n`);
    routeFileText = routeFileText.concat(librariesRequire);
    routeFileText = routeFileText.concat(
      `router.post("/add", async (req, res) => {
            try {
              const ${modelName} = require("../models/${modelName}.js");
              await ${modelName}.sync();
              const ${modelName}Record = await ${modelName}.create({
                    ${await getFieldObject(modelDetail.field)}
                });
              return res.status(200).json({
                data: ${modelName}Record,
                status: true,
              });
            } catch (error) {
              return res.status(401).json({
                error: error,
                data: null,
                status: false,
              });
            }
          });\n\n
          module.exports = router;\n`
    );

    console.log(routeFileText);
    FS.writeFile(`release/routes/${modelName}.js`, routeFileText, (err) => {
      if (err) console.log(err);
      else console.log("\n=== Route Saved! ====\n");
    });
  } catch (error) {
    console.log(error);
  }
};

const buildRouteIndex = async () => {
  try {
    console.log(`\n========= Building Route Index ==============\n`);
    let routeFileText = "";
    routeFileText = routeFileText.concat(`//Auto Generated Routes Index\n\n`);
    routeFileText = routeFileText.concat(
      `const express = require('express');
          const router = express.Router();
          ${getRouteUseText(configuration.model)}

          router.use((req, res, next) => {
            const error = new Error('Routes not found, Please Build Files by using Model_builder.js file');
            error.status = 404;
            next(error);
          });
          
          module.exports = router;`
    );

    console.log(routeFileText);
    FS.writeFile(`release/routes/index.js`, routeFileText, (err) => {
      if (err) console.log(err);
      else console.log("\n=== Route Index Saved! ====\n");
    });
  } catch (error) {
    console.log(error);
  }
};

const buildView = async (modelDetail) => {
  try {
    console.log(
      `\n========= Building View ${modelDetail.name} ==============\n`
    );
    let viewFileText = "";
    let modelName = modelDetail.name;
    viewFileText = viewFileText.concat(
      `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST" action="http://localhost:4000/release/${modelName}/add" target="Thank you for your business! We look forward to working with you again">
    ${getViewLabelInput(modelDetail.field)}
    
    <input type="submit" name="submit" id="submit" value="Submit"/>
    </form>
</body>
</html>
      `
    );

    console.log(viewFileText);
    FS.writeFile(`release/views/${modelName}.html`, viewFileText, (err) => {
      if (err) console.log(err);
      else console.log("\n=== View Saved! ====\n");
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

const getFieldObject = async (data) => {
  let record = "";
  await data.forEach((field) => {
    if (field[0] != "id") {
      record = record.concat(`\t\t\t\t${field[0]} : req.body.${field[0]},\n`);
    }
  });
  return record;
};

const getRouteUseText = (models) => {
  let routeUseCode = "";
  models.forEach((model) => {
    routeUseCode = routeUseCode.concat(`
        const ${model.name} = require('./${model.name}');
        router.use("/${model.name}", ${model.name});
        `);
  });

  return routeUseCode;
};

const getViewLabelInput = (fields) => {
  let viewLabelInputCode = "";
  fields.forEach((field) => {
    if (field[0] != "id")
      viewLabelInputCode = viewLabelInputCode.concat(`
    <label>${field[2]}</label>
    <input type="${getViewType(field[1])}" name="${field[0]}" id="${
        field[0]
      }" value="" required/>
    `);
  });

  return viewLabelInputCode;
};

const getViewType = (type) => {
  if (type == "integer") return "number";
  if (type == "string") return "text";
};

// call build
build();
