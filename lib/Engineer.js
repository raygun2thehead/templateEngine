const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, githubUser) {
        super(name,id,email);
        this.githubUser = githubUser;
    }

    getRole() {
        return "Engineer";
    }

    getGithub() {
        return this.githubUser;
    }
}

module.exports = Engineer;