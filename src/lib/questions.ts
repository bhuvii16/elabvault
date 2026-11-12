import rawQuestions from "../../questions.json";

export type QuestionTestCase = {
  _id?: number | string;
  INPUT?: string;
  OUTPUT?: string;
};

export type ContributedSolution = {
  solution: string;
  contributor: {
    name: string;
    credit: string | null;
  };
  verified: boolean;
};

export type NormalizedQuestion = {
  id: string;
  sequenceId: number;
  level: number;
  sessionId: number | null;
  session: string;
  descriptionHtml: string;
  descriptionText: string;
  preview: string;
  tags: string[];
  mandatory: string[];
  testcases: QuestionTestCase[];
  mode: string | null;
  status: number | null;
  defaultCode: number | null;
  savedCode: string[];
  solutionCode: string | null;
  contributedSolutions: ContributedSolution[];
  solutionSource: "srm" | null;
  explanation: string | null;
  course: string;
  searchText: string;
  originalIndex: number;
};

const safeNumber = (value: unknown): number | null => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const stripHtml = (value: string): string => {
  if (!value) return "";

  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
};

export const sanitizeHtml = (value: string): string => {
  if (!value) return "";

  let cleaned = value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/<\/?(script|style|iframe|object|embed|meta|link|form|input)[^>]*>/gi, "");

  const safeTags = [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "ul",
    "ol",
    "li",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "pre",
    "code",
    "blockquote",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "a",
    "span",
    "div",
    "hr",
  ];

  const allowed = new RegExp(`</?(?!/?(?:${safeTags.join("|")}))[^>]+>`, "gi");
  cleaned = cleaned.replace(allowed, "");

  return cleaned.trim();
};

export const normalizeQuestions = (items: unknown[]): NormalizedQuestion[] => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item, index) => {
    const question = item as Record<string, unknown>;
    const descriptionHtml = typeof question.description_html === "string" ? question.description_html : "";
    const descriptionText = stripHtml(descriptionHtml);

    const session = typeof question.session === "string" ? question.session : "General";
    const tags = Array.isArray(question.tags)
      ? question.tags.map((tag) => String(tag)).filter(Boolean)
      : [];
    const mandatory = Array.isArray(question.mandatory)
      ? question.mandatory.map((entry) => String(entry)).filter(Boolean)
      : [];
    const testcases = Array.isArray(question.testcases)
      ? question.testcases.map((testCase) => {
          const record = testCase as Record<string, unknown>;
          const rawId = record._id;

          return {
            _id:
              typeof rawId === "number" || typeof rawId === "string" ? rawId : undefined,
            INPUT: typeof record.INPUT === "string" ? record.INPUT : "",
            OUTPUT: typeof record.OUTPUT === "string" ? record.OUTPUT : "",
          } satisfies QuestionTestCase;
        })
      : [];

    const id = typeof question.id === "string" ? question.id : `question-${index + 1}`;
    const sequenceId = safeNumber(question.sequence_id) ?? index + 1;
    const level = safeNumber(question.level) ?? 1;
    const sessionId = safeNumber(question.session_id);
    const savedCode = Array.isArray(question.saved_code)
      ? question.saved_code.map((entry) => String(entry))
      : [];
    const originalSolution = savedCode.find((code) => code.trim().length > 0) ?? null;
    const solutionCode = originalSolution ?? null;
    const contributedSolutions = Array.isArray(question.contributed_solutions)
      ? question.contributed_solutions.flatMap((entry): ContributedSolution[] => {
          if (!entry || typeof entry !== "object") {
            return [];
          }

          const contribution = entry as Record<string, unknown>;
          const contributorValue = contribution.contributor;
          if (!contributorValue || typeof contributorValue !== "object") {
            return [];
          }

          const contributorRecord = contributorValue as Record<string, unknown>;
          const name = typeof contributorRecord.name === "string" ? contributorRecord.name.trim() : "";
          const solution = typeof contribution.solution === "string" ? contribution.solution : "";
          if (!name || !solution.trim() || contribution.verified !== true) {
            return [];
          }

          const credit =
            typeof contributorRecord.credit === "string" && contributorRecord.credit.trim()
              ? contributorRecord.credit.trim()
              : null;

          return [
            {
              solution,
              contributor: { name, credit },
              verified: contribution.verified === true,
            },
          ];
        })
      : [];
    const explanation =
      typeof question.explanation === "string" && question.explanation.trim()
        ? question.explanation.trim()
        : null;
    const course = "C Programming";
    const preview =
      descriptionText.length > 180
        ? `${descriptionText.slice(0, 177).trim()}...`
        : descriptionText;

    const searchText = [String(session), descriptionText]
      .join(" ")
      .toLowerCase();

    return {
      id,
      sequenceId,
      level,
      sessionId,
      session,
      descriptionHtml,
      descriptionText,
      preview,
      tags,
      mandatory,
      testcases,
      mode: typeof question.mode === "string" ? question.mode : null,
      status: safeNumber(question.status),
      defaultCode: safeNumber(question.default_code),
      savedCode,
      solutionCode,
      contributedSolutions,
      solutionSource: originalSolution ? "srm" : null,
      explanation,
      course,
      searchText,
      originalIndex: index,
    } satisfies NormalizedQuestion;
  });
};

export const allQuestions = normalizeQuestions(rawQuestions as unknown[]);
export const cProgrammingQuestions = allQuestions;

export const getQuestionDisplayTitle = (
  question: Pick<NormalizedQuestion, "sequenceId" | "level" | "session">,
): string => `Question ${String(question.sequenceId).padStart(2, "0")}`;

export const getLevelOptions = (questions: NormalizedQuestion[] = allQuestions): number[] =>
  Array.from(new Set(questions.map((question) => question.level))).sort((a, b) => a - b);

export const getSessionOptions = (questions: NormalizedQuestion[] = allQuestions): string[] =>
  Array.from(new Set(questions.map((question) => question.session))).sort((a, b) =>
    a.localeCompare(b),
  );

export const courseSummary = [
  {
    slug: "c-programming",
    name: "C Programming",
    status: "available" as const,
    questionCount: cProgrammingQuestions.length,
  },
];
