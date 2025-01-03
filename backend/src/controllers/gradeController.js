const gradeService = require("../services/gradeService");

class GradeController {
    async addGrade(req, res) {
        try {
            const grade = await gradeService.addGrade(req.body);
            res.status(201).json({ success: true, data: grade });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateGrade(req, res) {
        try {
            const { id } = req.params;
            const grade = await gradeService.updateGrade(id, req.body);
            res.status(200).json({ success: true, data: grade });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getGradesByStudent(req, res) {
        try {
            const { studentId } = req.params;
            const grades = await gradeService.getGradesByStudent(studentId);
            res.status(200).json({ success: true, data: grades });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    // async getGradesByStudent(req, res) {
    //     try {
    //         const { studentId } = req.params;
    //         const grades = await gradeService.getGradesByStudent(studentId);
    //         res.status(200).json({
    //             success: true,
    //             data: grades,
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             success: false,
    //             message: error.message,
    //         });
    //     }
    // }

    async deleteGrade(req, res) {
        try {
            const { id } = req.params;
            await gradeService.deleteGrade(id);
            res.status(200).json({ success: true, message: "Grade deleted" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new GradeController();
