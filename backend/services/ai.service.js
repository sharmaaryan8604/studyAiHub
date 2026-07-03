import Note from "../models/note.model.js";
import model from "../utils/gemini.js";

const sanitizeJsonResponse = (text = "") => {
    return text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
};

const parseStoredQuiz = (quizText = "") => {
    if (!quizText?.trim()) {
        return null;
    }

    try {
        return JSON.parse(quizText);
    } catch (error) {
        return null;
    }
};

export const generateSummaryService = async (noteId, userId) => {

    const note = await Note.findOne({
        _id: noteId,
        user: userId,
    });

    if (!note) {
        throw new Error("Note not found");
    }

    // Don't call Gemini again if we already have a summary
    if (note.summary && note.summary.trim() !== "") {
        return note.summary;
    }

    const prompt = `
You are an expert study assistant.

Summarize the following study material.

Requirements:
- Use simple language.
- Use bullet points.
- Keep important definitions.
- Highlight key concepts.
- Maximum 300 words.

Study Material:

${note.content}
`;

    const result = await model.generateContent(prompt);

    const response = result.response;

    const summary = response.text();

    note.summary = summary;

    await note.save();

    return summary;
};

export const generateQuizService = async (
    noteId,
    userId,
    options = {}
) => {
    const note = await Note.findOne({
        _id: noteId,
        user: userId,
    });

    if (!note) {
        throw new Error("Note not found");
    }

    const requestedDifficulty =
        options.difficulty?.trim().toLowerCase() || "medium";
    const normalizedDifficulty = [
        "easy",
        "medium",
        "hard",
    ].includes(requestedDifficulty)
        ? requestedDifficulty
        : "medium";

    const requestedQuestionCount = Number(
        options.questionCount
    );
    const forceRegenerate =
        options.forceRegenerate === true;
    const questionCount = Number.isFinite(
        requestedQuestionCount
    )
        ? Math.min(
              10,
              Math.max(3, Math.round(requestedQuestionCount))
          )
        : 5;

    const cachedQuiz = parseStoredQuiz(note.quiz);

    if (
        !forceRegenerate &&
        cachedQuiz?.difficulty === normalizedDifficulty &&
        cachedQuiz?.questionCount === questionCount &&
        Array.isArray(cachedQuiz?.questions) &&
        cachedQuiz.questions.length > 0
    ) {
        return cachedQuiz;
    }

    const prompt = `
You are an expert quiz generator for students.

Create a multiple-choice quiz from the study material below.

Rules:
- Return valid JSON only.
- Do not wrap the JSON in markdown.
- Output this exact shape:
{
  "title": string,
  "difficulty": string,
  "questionCount": number,
  "questions": [
    {
      "question": string,
      "options": [string, string, string, string],
      "correctAnswer": string,
      "explanation": string
    }
  ]
}
- Write exactly ${questionCount} questions.
- Each question must have exactly 4 options.
- "correctAnswer" must match one option exactly.
- Keep the wording specific to the study material.
- Explanations should be short and helpful.
- Difficulty should be "${normalizedDifficulty}".

Study material title: ${note.title}
Study material content:
${note.content}
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const rawQuiz = sanitizeJsonResponse(
        response.text()
    );

    let parsedQuiz;

    try {
        parsedQuiz = JSON.parse(rawQuiz);
    } catch (error) {
        throw new Error(
            "Quiz generation returned invalid JSON"
        );
    }

    if (!Array.isArray(parsedQuiz?.questions)) {
        throw new Error("Quiz generation failed");
    }

    const normalizedQuestions = parsedQuiz.questions
        .map((question, index) => {
            const options = Array.isArray(question?.options)
                ? question.options
                      .map((option) => String(option).trim())
                      .filter(Boolean)
                      .slice(0, 4)
                : [];

            const correctAnswer = String(
                question?.correctAnswer || ""
            ).trim();

            if (
                !question?.question ||
                options.length !== 4 ||
                !correctAnswer ||
                !options.includes(correctAnswer)
            ) {
                return null;
            }

            return {
                id: `${note._id}-${index + 1}`,
                question: String(question.question).trim(),
                options,
                correctAnswer,
                explanation: String(
                    question?.explanation || ""
                ).trim(),
            };
        })
        .filter(Boolean)
        .slice(0, questionCount);

    if (normalizedQuestions.length === 0) {
        throw new Error("Quiz generation failed");
    }

    const quizPayload = {
        title:
            parsedQuiz?.title?.trim() ||
            `${note.title} Quiz`,
        difficulty: normalizedDifficulty,
        questionCount: normalizedQuestions.length,
        questions: normalizedQuestions,
    };

    note.quiz = JSON.stringify(quizPayload);
    await note.save();

    return quizPayload;
};
