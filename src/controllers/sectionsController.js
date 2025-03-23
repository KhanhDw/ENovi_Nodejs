const SectionModel = require("../models/sections");
const LessionModel = require("../models/lession");

const deleteSection = async (req, res) => {
    try {
        const { sectionOrder, courseId } = req.params;

        console.log(sectionOrder, courseId);

        if (!sectionOrder && !courseId)
            return res.status(400).json({ erro: "sectionOrder, courseId lỗi" });

        await SectionModel.deleteSectionByCourseId(courseId, sectionOrder);

        return res.json({
            success: true,
            message: "delete section successfull",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};
const updateNameSection = async (req, res) => {
    try {
        const { sectionOrder, courseId } = req.params;
        const { title } = req.body;

        console.log(title, sectionOrder, courseId + ": update sections");

        if (!title && !sectionOrder && !courseId)
            return res.status(400).json({ erro: "sectionOrder, courseId lỗi" });

        await SectionModel.updateNameSectionByCourseId(
            title,
            courseId,
            sectionOrder
        );

        return res.json({
            success: true,
            message: "update section successfull",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};
const createSection = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, sectionOrderMax } = req.body;

        console.log(title, sectionOrderMax, courseId + ": update sections");

        if (!title && !sectionOrderMax && !courseId)
            return res.status(400).json({ erro: "sectionOrder, courseId lỗi" });

        await SectionModel.createSectionByCourseId(
            title,
            courseId,
            sectionOrderMax
        );

        return res.json({
            success: true,
            message: "create section successfull",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};
const getSection = async (req, res) => {
    try {
        const { courseId } = req.params;

        console.log(courseId + ": update sections");

        if (!courseId) return res.status(400).json({ erro: "courseId lỗi" });

        let listSection = await SectionModel.getSectionByCourseId(courseId);
        let sumLesson = await LessionModel.getSumLessonInCourseByCourseId(courseId);


        return res.json({
            success: true,
            message: "get section successfull",
            sectionFetch: listSection,
            sumLesson: sumLesson,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};
const getSectionId = async (req, res) => {
    try {
        const { courseId, sectionOrder } = req.params;

        if (!courseId && !sectionOrder)
            return res.status(400).json({ erro: "courseId lỗi" });

        let Section_id = await SectionModel.getSectionIdByCourseId(
            courseId,
            sectionOrder
        );

        return res.json({
            success: true,
            message: "get section successfull",
            sectionFetch_id: Section_id,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};

module.exports = {
    deleteSection,
    updateNameSection,
    createSection,
    getSection,
    getSectionId,
};
