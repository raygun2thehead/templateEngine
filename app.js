const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { format } = require("path");

//asynchonos function that asks questions on cli
async function askQuestions() {
    //just learned the try/catch thing today. need to read more on it
    try {
        const allEmployeeData = [];

        // while loop that doesnt stop until you answer 'no' to final question
        var moreEmployees = true

        while (moreEmployees) {
            // basic employee questions
            const employeeAnswers = await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Employee's Name:",
                },
                {
                    type: "input",
                    name: "id",
                    message: "ID number:",
                },
                {
                    type: "input",
                    name: "email",
                    message: "Email Address:",
                },
                {
                    type: "list",
                    name: "employeeType",
                    message: "Type of Employee",
                    choices: [
                        "Manager",
                        "Intern",
                        "Engineer"
                    ]
                }
            ]);
            //employee questions based on employeeType
            switch (employeeAnswers.employeeType) {
                case "Manager": {
                    const managerAnswers = await inquirer.prompt([
                        {
                            type: "input",
                            name: "officeNumber",
                            message: "Office Number:"
                        }
                    ]);
                    employeeAnswers.newAnswer = managerAnswers;
                    break;
                }
                case "Intern": {
                    const internAnswers = await inquirer.prompt([
                        {
                            type: "input",
                            name: "school",
                            message: "Name of School:"
                        }
                    ]);
                    employeeAnswers.newAnswer = internAnswers;
                    break;
                }
                case "Engineer": {
                    const engineerAnswers = await inquirer.prompt([
                        {
                            type: "input",
                            name: "githubUser",
                            message: "Github UserName:"
                        }
                    ]);
                    employeeAnswers.newAnswer = engineerAnswers;
                    break;
                }
            }
            allEmployeeData.push(employeeAnswers)

            // more employees prompt that ends or continues while loop
            const moreEmployeesQ = await inquirer.prompt([{
                type: "confirm",
                name: "another",
                message: "Add another employee?"
            }])

            moreEmployees = moreEmployeesQ.another
        }

        // foreach loop that goes through the array and formats it with the proper imported function, creating new sub classes
        const formattedEmpArr = []
        
        allEmployeeData.forEach(element => {
            const name = element.name;
            const id = element.id;
            const email = element.email;
            const employeeType = element.employeeType;
            switch (employeeType) {
                case "Manager": {
                    const officeNumber = element.newAnswer.officeNumber;
                    const manager = new Manager(name, id, email, officeNumber);
                    formattedEmpArr.push(manager);
                    break;
                }
                case "Intern": {
                    const school = element.newAnswer.school;
                    const intern = new Intern(name, id, email, school);
                    formattedEmpArr.push(intern);
                    break;
                }
                case "Engineer": {
                    const githubUser = element.newAnswer.githubUser;
                    const engineer = new Engineer(name, id, email, githubUser);
                    formattedEmpArr.push(engineer);
                    break;
                }
            }
        });
        return (formattedEmpArr);
    }
    catch (err) {
        // i need this and it set me back hours figuring it out
        console.log(err);
    }
}

// function that starts the app and eventually builds the team page
async function teamBuild() {
    const formattedEmpArr = await askQuestions();
    const output = await render(formattedEmpArr);

    fs.writeFile(outputPath, output, function (err) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log("Successfully wrote the team.html file!");
        }
    });
}

teamBuild();
