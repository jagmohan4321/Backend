const Student = require("../modals/Student.js");

async function InsertStudentController(request, response) {
    try {
        console.log("ghj")
        const { firstName, lastName, age } = request.body;
        const newStudent = await Student.create({ firstName, lastName, age });
        return response.status(201).json({
            message: "Student added successfully in database",
            success: true,
            data: newStudent
        })
    }
    catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            success: false
        })

    }

}

module.exports = InsertStudentController;