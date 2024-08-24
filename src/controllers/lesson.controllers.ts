import { Lesson } from "../models/lesson.model";

export const createLesson = async (req, res) => {
  try {
    const { courseId, lessonTitle, lessonDuration, isPaid } =
      req.body;

    if (
      !req.files ||
      !req.files["thumbnailImage"] ||
      !req.files["lessonVideo"]
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Files are missing" });
    }

    const thumbnailImage = req.files["thumbnailImage"][0].path;
    const lessonVideo = req.files["lessonVideo"][0].path;

    const lesson = new Lesson({
      courseId,
      thumbnailImage,
      lessonTitle,
      lessonDuration,
      lessonVideo,
      isPaid: isPaid || false,
    });

    const createdLesson = await lesson.save();
    res.status(201).json(createdLesson);
  } catch (error) {
    console.error("Error creating lesson:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (lesson) {
      res.status(200).json(lesson);
    } else {
      res.status(404).json({ message: "Lesson not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { courseId, lessonTitle, lessonDuration, isPaid } =
      req.body;
    const lesson = await Lesson.findById(req.params.id);

    if (lesson) {
      lesson.courseId = courseId || lesson.courseId;
      lesson.lessonTitle = lessonTitle || lesson.lessonTitle;
      lesson.lessonDuration = lessonDuration || lesson.lessonDuration;
      lesson.isPaid = isPaid !== undefined ? isPaid : lesson.isPaid;

      if (req.files["thumbnailImage"]) {
        lesson.thumbnailImage = req.files["thumbnailImage"][0].path;
      }

      if (req.files["lessonVideo"]) {
        lesson.lessonVideo = req.files["lessonVideo"][0].path;
      }

      const updatedLesson = await lesson.save();
      res.status(200).json(updatedLesson);
    } else {
      res.status(404).json({ message: "Lesson not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLesson = async (req, res) => {
  const id = req.params.id;

  try {
    const lesson = await Lesson.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
