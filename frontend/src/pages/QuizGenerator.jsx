import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FiArrowRight,
    FiBookOpen,
    FiCheckCircle,
    FiLoader,
    FiRefreshCw,
    FiTarget,
} from "react-icons/fi";

import DashboardLayout from "../components/layout/DashboardLayout";
import useTheme from "../hooks/useTheme";
import { generateQuiz } from "../services/ai.service";
import { getAllNotes } from "../services/note.service";

const difficultyOptions = [
    {
        label: "Easy",
        value: "easy",
    },
    {
        label: "Medium",
        value: "medium",
    },
    {
        label: "Hard",
        value: "hard",
    },
];

const questionCountOptions = [3, 5, 7, 10];

const QuizGenerator = () => {
    const { isDarkTheme } = useTheme();
    const [notes, setNotes] = useState([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [selectedNoteId, setSelectedNoteId] = useState("");
    const [difficulty, setDifficulty] = useState("medium");
    const [questionCount, setQuestionCount] = useState(5);
    const [quizLoading, setQuizLoading] = useState(false);
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setNotesLoading(true);

            const data = await getAllNotes();
            const nextNotes = data.notes ?? [];

            setNotes(nextNotes);

            if (!selectedNoteId && nextNotes.length > 0) {
                setSelectedNoteId(nextNotes[0]._id);
            }
        } catch (error) {
            console.error(error);
            toast.error("Couldn't load notes for quizzes.");
        } finally {
            setNotesLoading(false);
        }
    };

    const selectedNote = notes.find(
        (note) => note._id === selectedNoteId
    );

    const handleGenerateQuiz = async (
        forceRegenerate = false
    ) => {
        if (!selectedNoteId) {
            toast.error("Pick a note first.");
            return;
        }

        try {
            setQuizLoading(true);
            setSubmitted(false);
            setAnswers({});

            const data = await generateQuiz(selectedNoteId, {
                difficulty,
                forceRegenerate,
                questionCount,
            });

            setQuiz(data.quiz);
            toast.success("Quiz ready.");
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message ??
                    "Couldn't generate quiz."
            );
        } finally {
            setQuizLoading(false);
        }
    };

    const handleAnswerChange = (questionId, option) => {
        setAnswers((current) => ({
            ...current,
            [questionId]: option,
        }));
    };

    const handleSubmitQuiz = () => {
        if (!quiz) {
            return;
        }

        const answeredCount = Object.keys(answers).length;

        if (answeredCount < quiz.questions.length) {
            toast.error("Answer every question first.");
            return;
        }

        setSubmitted(true);
    };

    const score = quiz
        ? quiz.questions.reduce((total, question) => {
              return answers[question.id] ===
                  question.correctAnswer
                  ? total + 1
                  : total;
          }, 0)
        : 0;

    const scorePercentage = quiz
        ? Math.round((score / quiz.questions.length) * 100)
        : 0;

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <section
                    className={`overflow-hidden rounded-[34px] border p-8 sm:p-10 ${
                        isDarkTheme
                            ? "border-slate-800 bg-slate-900"
                            : "border-slate-200 bg-[#f6f1e7]"
                    }`}
                >
                    <div className="grid gap-8 xl:grid-cols-[1.25fr_0.9fr]">
                        <div className="max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-500">
                                Quiz Studio
                            </p>
                            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                                Turn notes into practice questions that actually help you revise.
                            </h1>
                            <p
                                className={`mt-4 text-base leading-8 ${
                                    isDarkTheme
                                        ? "text-slate-300"
                                        : "text-slate-600"
                                }`}
                            >
                                Pick one note, choose the challenge level, and generate a focused quiz you can answer right here.
                            </p>
                        </div>

                        <div
                            className={`rounded-[28px] border p-6 ${
                                isDarkTheme
                                    ? "border-slate-800 bg-slate-950"
                                    : "border-slate-200 bg-white"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                                    <FiTarget className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                                        Current Setup
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        {selectedNote?.title ||
                                            "No note selected"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`text-sm ${
                                            isDarkTheme
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        Difficulty
                                    </span>
                                    <span className="font-semibold capitalize">
                                        {difficulty}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`text-sm ${
                                            isDarkTheme
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        Questions
                                    </span>
                                    <span className="font-semibold">
                                        {questionCount}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`text-sm ${
                                            isDarkTheme
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        Notes available
                                    </span>
                                    <span className="font-semibold">
                                        {notes.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[0.95fr_1.25fr]">
                    <div
                        className={`rounded-[30px] border p-6 ${
                            isDarkTheme
                                ? "border-slate-800 bg-slate-900"
                                : "border-slate-200 bg-white"
                        }`}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                                    Source Material
                                </p>
                                <h2 className="mt-2 text-2xl font-bold">
                                    Choose a note
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={fetchNotes}
                                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                                    isDarkTheme
                                        ? "border-slate-800 hover:border-slate-700"
                                        : "border-slate-200 hover:border-slate-300"
                                }`}
                            >
                                Refresh
                            </button>
                        </div>

                        <div className="mt-6 space-y-3">
                            {notesLoading ? (
                                [1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className={`h-24 animate-pulse rounded-3xl ${
                                            isDarkTheme
                                                ? "bg-slate-800"
                                                : "bg-slate-100"
                                        }`}
                                    />
                                ))
                            ) : notes.length === 0 ? (
                                <div
                                    className={`rounded-3xl border border-dashed p-6 text-center ${
                                        isDarkTheme
                                            ? "border-slate-700 text-slate-400"
                                            : "border-slate-300 text-slate-500"
                                    }`}
                                >
                                    Upload or create notes first.
                                </div>
                            ) : (
                                notes.map((note) => {
                                    const isActive =
                                        note._id ===
                                        selectedNoteId;

                                    return (
                                        <button
                                            key={note._id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedNoteId(
                                                    note._id
                                                );
                                                setQuiz(null);
                                                setSubmitted(
                                                    false
                                                );
                                                setAnswers(
                                                    {}
                                                );
                                            }}
                                            className={`w-full rounded-3xl border p-4 text-left transition ${
                                                isActive
                                                    ? isDarkTheme
                                                        ? "border-amber-400 bg-amber-500/10"
                                                        : "border-amber-300 bg-amber-50"
                                                    : isDarkTheme
                                                      ? "border-slate-800 hover:border-slate-700 hover:bg-slate-950"
                                                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-lg font-semibold">
                                                        {
                                                            note.title
                                                        }
                                                    </p>
                                                    <p
                                                        className={`mt-2 line-clamp-2 text-sm leading-6 ${
                                                            isDarkTheme
                                                                ? "text-slate-400"
                                                                : "text-slate-600"
                                                        }`}
                                                    >
                                                        {
                                                            note.content
                                                        }
                                                    </p>
                                                </div>
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                                                    <FiBookOpen />
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <section
                            className={`rounded-[30px] border p-6 ${
                                isDarkTheme
                                    ? "border-slate-800 bg-slate-900"
                                    : "border-slate-200 bg-white"
                            }`}
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                                Generator
                            </p>

                            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                                <div>
                                    <p className="text-sm font-semibold">
                                        Difficulty
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {difficultyOptions.map(
                                            (option) => (
                                                <button
                                                    key={
                                                        option.value
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        setDifficulty(
                                                            option.value
                                                        )
                                                    }
                                                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                                        difficulty ===
                                                        option.value
                                                            ? "bg-slate-900 text-white"
                                                            : isDarkTheme
                                                              ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                    }`}
                                                >
                                                    {
                                                        option.label
                                                    }
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Question count
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {questionCountOptions.map(
                                            (count) => (
                                                <button
                                                    key={count}
                                                    type="button"
                                                    onClick={() =>
                                                        setQuestionCount(
                                                            count
                                                        )
                                                    }
                                                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                                        questionCount ===
                                                        count
                                                            ? "bg-amber-500 text-white"
                                                            : isDarkTheme
                                                              ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                    }`}
                                                >
                                                    {count}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleGenerateQuiz()
                                    }
                                    disabled={
                                        !selectedNoteId ||
                                        quizLoading
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-slate-400"
                                >
                                    {quizLoading ? (
                                        <FiLoader className="animate-spin" />
                                    ) : (
                                        <FiTarget />
                                    )}
                                    {quizLoading
                                        ? "Generating quiz..."
                                        : "Generate quiz"}
                                </button>

                                {quiz ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAnswers({});
                                            setSubmitted(
                                                false
                                            );
                                        }}
                                        className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 font-semibold transition ${
                                            isDarkTheme
                                                ? "border-slate-800 hover:border-slate-700"
                                                : "border-slate-200 hover:border-slate-300"
                                        }`}
                                    >
                                        <FiRefreshCw />
                                        Reset answers
                                    </button>
                                ) : null}
                            </div>
                        </section>

                        <section
                            className={`rounded-[30px] border p-6 ${
                                isDarkTheme
                                    ? "border-slate-800 bg-slate-900"
                                    : "border-slate-200 bg-white"
                            }`}
                        >
                            {!quiz ? (
                                <div className="py-12 text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-100 text-amber-700">
                                        <FiTarget className="text-2xl" />
                                    </div>
                                    <h2 className="mt-5 text-2xl font-bold">
                                        Your quiz will appear here.
                                    </h2>
                                    <p
                                        className={`mx-auto mt-3 max-w-md text-sm leading-7 ${
                                            isDarkTheme
                                                ? "text-slate-400"
                                                : "text-slate-600"
                                        }`}
                                    >
                                        Pick a note and generate a set of questions to start practicing.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-500">
                                                Ready to Practice
                                            </p>
                                            <h2 className="mt-2 text-3xl font-bold">
                                                {quiz.title}
                                            </h2>
                                        </div>

                                        {submitted ? (
                                            <div className="rounded-3xl bg-emerald-100 px-5 py-4 text-emerald-800">
                                                <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                                                    Score
                                                </p>
                                                <p className="mt-1 text-3xl font-bold">
                                                    {score}/
                                                    {
                                                        quiz
                                                            .questions
                                                            .length
                                                    }
                                                </p>
                                                <p className="text-sm">
                                                    {
                                                        scorePercentage
                                                    }
                                                    %
                                                </p>
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="space-y-6">
                                        {quiz.questions.map(
                                            (
                                                question,
                                                index
                                            ) => {
                                                const selectedAnswer =
                                                    answers[
                                                        question
                                                            .id
                                                    ];

                                                return (
                                                    <article
                                                        key={
                                                            question.id
                                                        }
                                                        className={`rounded-[28px] border p-5 ${
                                                            isDarkTheme
                                                                ? "border-slate-800 bg-slate-950"
                                                                : "border-slate-200 bg-slate-50"
                                                        }`}
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 font-semibold text-white">
                                                                {index +
                                                                    1}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <h3 className="text-xl font-semibold leading-8">
                                                                    {
                                                                        question.question
                                                                    }
                                                                </h3>

                                                                <div className="mt-4 grid gap-3">
                                                                    {question.options.map(
                                                                        (
                                                                            option
                                                                        ) => {
                                                                            const isSelected =
                                                                                selectedAnswer ===
                                                                                option;
                                                                            const isCorrect =
                                                                                submitted &&
                                                                                question.correctAnswer ===
                                                                                    option;
                                                                            const isWrong =
                                                                                submitted &&
                                                                                isSelected &&
                                                                                !isCorrect;

                                                                            return (
                                                                                <button
                                                                                    key={
                                                                                        option
                                                                                    }
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        handleAnswerChange(
                                                                                            question.id,
                                                                                            option
                                                                                        )
                                                                                    }
                                                                                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                                                                                        isCorrect
                                                                                            ? "border-emerald-400 bg-emerald-100 text-emerald-900"
                                                                                            : isWrong
                                                                                              ? "border-rose-400 bg-rose-100 text-rose-900"
                                                                                              : isSelected
                                                                                                ? "border-amber-400 bg-amber-50 text-slate-900"
                                                                                                : isDarkTheme
                                                                                                  ? "border-slate-800 bg-slate-900 text-slate-200 hover:border-slate-700"
                                                                                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                                                                    }`}
                                                                                >
                                                                                    {
                                                                                        option
                                                                                    }
                                                                                </button>
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>

                                                                {submitted ? (
                                                                    <div className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-sm leading-7 text-slate-700">
                                                                        <div className="flex items-center gap-2 font-semibold text-emerald-700">
                                                                            <FiCheckCircle />
                                                                            Correct answer:{" "}
                                                                            {
                                                                                question.correctAnswer
                                                                            }
                                                                        </div>
                                                                        {question.explanation ? (
                                                                            <p className="mt-2">
                                                                                {
                                                                                    question.explanation
                                                                                }
                                                                            </p>
                                                                        ) : null}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </article>
                                                );
                                            }
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <button
                                            type="button"
                                            onClick={
                                                handleSubmitQuiz
                                            }
                                            disabled={submitted}
                                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-amber-300"
                                        >
                                            Submit quiz
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleGenerateQuiz(
                                                    true
                                                )
                                            }
                                            disabled={quizLoading}
                                            className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 font-semibold transition ${
                                                isDarkTheme
                                                    ? "border-slate-800 hover:border-slate-700"
                                                    : "border-slate-200 hover:border-slate-300"
                                            }`}
                                        >
                                            <FiArrowRight />
                                            Generate another version
                                        </button>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
};

export default QuizGenerator;
