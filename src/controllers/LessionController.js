const LessionModel = require("../models/lession");

const getLession = async (req, res) => {
    try {
        const { sectionId } = req.params;
        const { courseId } = req.body;

        console.log(sectionId, courseId);

        if ((!sectionId, courseId))
            return res.status(400).json({ erro: "sectionOrder lỗi" });

        let listLession = await LessionModel.getLessionBySectionId(sectionId);

        return res.json({
            success: true,
            message: "get lession successfull",
            lessionList: listLession,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};
const updateLessonTitle = async (req, res) => {
    try {
        const { sectionId } = req.params;
        const { title } = req.body;

        console.log(sectionId);
        console.log(title);

        if (!sectionId && !title)
            return res.status(400).json({ erro: "title and lesssonid lỗi" });

        await LessionModel.updateTitleLessonByLessonId(title, sectionId);

        return res.json({
            success: true,
            message: "update title lesson successfull",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};
const updateLessonNameVideo = async (req, res) => {
    try {
        const { sectionId, lessonId } = req.params;
        const { nameFileVideo } = req.body;

        console.log(
            "updateLessonNameVideo: sectionId, lessonId:" + sectionId,
            lessonId
        );
        console.log("updateLessonNameVideo: " + nameFileVideo);

        if (!sectionId && !lessonId && !nameFileVideo)
            return res.status(400).json({ erro: " and lesssonid lỗi11" });

        await LessionModel.updateNameVideoLessonByLessonId(
            nameFileVideo,
            lessonId
        );

        return res.json({
            success: true,
            message: "update urlvide lesson successfull",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};

const createLession = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        console.log("createLession: " + sectionId, courseId);

        if ((!sectionId && !courseId))
            return res.status(400).json({ erro: "sectionID và courseID  lỗi khởi tạo lessson" });

        await LessionModel.createLesson(sectionId, courseId);

        return res.json({
            success: true,
            message: "create lession successfull",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};
const deleteLession = async (req, res) => {
    try {
        const { lessonId } = req.params;

        console.log("deleteLession: " + lessonId);

        if (!lessonId)
            return res.status(400).json({ error: "lessonId is required" });

        await LessionModel.deleteLessonById(lessonId);

        return res.json({
            success: true,
            message: "delete lession successful",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};

module.exports = {
    getLession,
    updateLessonTitle,
    updateLessonNameVideo,
    createLession,deleteLession
};
