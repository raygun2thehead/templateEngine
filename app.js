const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeeQuestions = [
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
];

const managerQuestion = [
    {
        type: "input",
        name: "officeNumber",
        message: "Office Number:"
    }
];

const internQuestion = [
    {
        type: "input",
        name: "school",
        message: "Name of School:"
    }
];

const engineerQuestion = [
    {
        type: "input",
        name: "githubUser",
        message: "Github UserName:"
    }
];
const allEmployeeData = [];

async function askQuestions() {

    const employeeAnswers = await inquirer.prompt(employeeQuestions);

    switch (employeeAnswers.employeeType) {
        case "Manager": {
            const managerAnswers = await inquirer.prompt(managerQuestion);
            employeeAnswers.newAnswer = managerAnswers;
            break;
        }
        case "Intern": {
            const internAnswers = await inquirer.prompt(internQuestion);
            employeeAnswers.newAnswer = internAnswers;
            break;
        }
        case "Engineer": {
            const engineerAnswers = await inquirer.prompt(engineerQuestion);
            employeeAnswers.newAnswer = engineerAnswers;
            break;
        }
    }

    allEmployeeData.push(employeeAnswers)

    const moreEmployees = await inquirer.prompt([{
        type: "confirm",
        name: "another",
        message: "Add another employee?"
    }])
    if (moreEmployees.another) {
        askQuestions();
    }
    await allEmployeeData.forEach(element => {
        formattedEmpObject = []
        const name = element.name;
        const id = element.id;
        const email = element.email;
        const employeeType = element.employeeType;
        switch (employeeType) {
            case "Manager": {
                const officeNumber = element.newAnswer.officeNumber;
                const manager = new Manager(name, id, email, officeNumber);
                formattedEmpObject.push(manager);
                break;
            }
            case "Intern": {
                const school = element.newAnswer.school;
                const intern = new Intern(name, id, email, school);
                formattedEmpObject.push(intern);
                break;
            }
            case "Engineer": {
                const github = element.newAnswer.github;
                const engineer = new Engineer(name, id, email, github);
                formattedEmpObject.push(engineer);
                break;
            }
        }
        return (formattedEmpObject);
    });


        const output = await render(formattedEmpObject);
    
        fs.writeFile(outputPath, output, function (err) {
            if (err) {
                return console.log(err);
            }
            else {
                console.log("Successfully wrote the team.html file!");
            }
        });
    
}
askQuestions()



