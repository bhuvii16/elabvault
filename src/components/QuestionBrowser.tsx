"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  getLevelOptions,
  getQuestionDisplayTitle,
  getSessionOptions,
  type NormalizedQuestion,
} from "@/lib/questions";

type QuestionBrowserProps = {
  questions: NormalizedQuestion[];
};

function HighlightText({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return <>{text}</>;
  }

  const safeTerms = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${safeTerms.join("|")})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        terms.some((term) => part.toLowerCase() === term.toLowerCase()) ? (
          <mark key={`${part}-${index}`} className="rounded bg-emerald-500/20 px-1 text-emerald-200">
            {part}
          </mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

function QuestionLink({
  question,
  query,
  showContext = false,
}: {
  question: NormalizedQuestion;
  query: string;
  showContext?: boolean;
}) {
  return (
    <Link
      href={`/questions/${encodeURIComponent(question.id)}`}
      className="group block border-t border-zinc-800 py-4 first:border-t-0 first:pt-0 last:pb-0"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-300">
          {getQuestionDisplayTitle(question)}
        </span>
        {showContext && (
          <span className="text-xs text-zinc-500">
            Level {question.level} · {question.session}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-200 transition group-hover:text-white">
        <HighlightText text={question.preview || question.session} query={query} />
      </p>
      {question.tags.length > 0 && (
        <p className="mt-2 text-xs text-zinc-500">{question.tags.slice(0, 3).join(" · ")}</p>
      )}
    </Link>
  );
}

export function QuestionBrowser({ questions }: QuestionBrowserProps) {
  const levels = useMemo(() => getLevelOptions(questions), [questions]);
  const sessions = useMemo(() => getSessionOptions(questions), [questions]);
  const solvedQuestions = useMemo(
    () =>
      questions.filter(
        (question) =>
          Boolean(question.solutionCode || question.savedCode.length > 0) ||
          question.contributedSolutions.length > 0,
      ),
    [questions],
  );

  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sessionFilter, setSessionFilter] = useState("all");
  const [solvedFilter, setSolvedFilter] = useState<"all" | "solved">("all");

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();
    const levelPhrase = normalizedQuery.match(/\blevel\s*(\d+)\b/);
    const queryWithoutLevel = normalizedQuery.replace(/\blevel\s*\d+\b/g, " ");
    const terms = queryWithoutLevel.split(/\s+/).filter(Boolean);

    const matches = questions.filter((question) => {
      const matchesSearch = terms.every((term) => question.searchText.includes(term));
      const matchesLevelPhrase = !levelPhrase || question.level === Number(levelPhrase[1]);

      const matchesLevel = levelFilter === "all" || String(question.level) === levelFilter.trim();
      const matchesSession = sessionFilter === "all" || question.session === sessionFilter;
      const matchesSolved =
        solvedFilter === "all" ||
        Boolean(question.solutionCode || question.savedCode.length > 0) ||
        question.contributedSolutions.length > 0;

      return matchesSearch && matchesLevelPhrase && matchesLevel && matchesSession && matchesSolved;
    });

    return matches;
  }, [levelFilter, questions, search, sessionFilter, solvedFilter]);

  const groupedQuestions = useMemo(() => {
    const grouped = new Map<number, Map<string, NormalizedQuestion[]>>();

    filteredQuestions.forEach((question) => {
      if (!grouped.has(question.level)) {
        grouped.set(question.level, new Map<string, NormalizedQuestion[]>());
      }

      const levelMap = grouped.get(question.level)!;
      const key = question.session;
      const next = levelMap.get(key) ?? [];
      next.push(question);
      levelMap.set(key, next);
    });

    return Array.from(grouped.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([level, sessionsMap]) => ({
        level,
        sessions: Array.from(sessionsMap.entries()).sort(([a], [b]) => a.localeCompare(b)),
      }));
  }, [filteredQuestions]);

  const hasActiveFilters = Boolean(
    search.trim() || levelFilter !== "all" || sessionFilter !== "all" || solvedFilter !== "all",
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_0.75fr_0.85fr] lg:items-end">
          <div>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Search by question, concept, or level
            </label>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try a phrase like arrays, loops, or level 2"
              aria-label="Search by question, concept, or level"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Level
            </label>
            <select
              value={levelFilter}
              onChange={(event) => setLevelFilter(event.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-zinc-100 outline-none focus:border-emerald-500"
            >
              <option value="all">All levels</option>
              {levels.map((level) => (
                <option key={level} value={String(level)}>
                  Level {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Concept
            </label>
            <select
              value={sessionFilter}
              onChange={(event) => setSessionFilter(event.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-zinc-100 outline-none focus:border-emerald-500"
            >
              <option value="all">All concepts</option>
              {sessions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-zinc-300">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              {filteredQuestions.length} result{filteredQuestions.length === 1 ? "" : "s"}
            </span>
            <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 p-1">
              <button
                type="button"
                onClick={() => setSolvedFilter("all")}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                  solvedFilter === "all" ? "bg-emerald-500 text-zinc-950" : "text-zinc-300 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSolvedFilter("solved")}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                  solvedFilter === "solved" ? "bg-emerald-500 text-zinc-950" : "text-zinc-300 hover:text-white"
                }`}
              >
                Solved ({solvedQuestions.length})
              </button>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setLevelFilter("all");
                setSessionFilter("all");
                setSolvedFilter("all");
              }}
              className="text-emerald-300 transition hover:text-emerald-200"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 text-center">
          <p className="text-xl font-semibold text-zinc-50">No matching questions found.</p>
          <p className="mt-2 text-sm text-zinc-400">
            Try a different keyword or clear the active filters to browse the full bank.
          </p>
        </div>
      ) : hasActiveFilters ? (
        <div className="divide-y divide-zinc-800 rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 sm:px-5">
          {filteredQuestions.map((question) => (
            <QuestionLink key={question.id} question={question} query={search} showContext />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {groupedQuestions.map(({ level, sessions }, levelIndex) => (
            <details
              key={level}
              open={levelIndex === 0}
              className="group rounded-xl border border-zinc-800 bg-zinc-950/80"
            >
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2 p-4 sm:px-5">
                <span className="text-lg font-semibold text-zinc-100">Level {level}</span>
                <span className="ml-auto text-xs text-zinc-500">
                  {sessions.reduce((sum, [, conceptQuestions]) => sum + conceptQuestions.length, 0)} questions
                  <span className="px-2">·</span>
                  {sessions.length} concepts
                </span>
              </summary>

              <div className="border-t border-zinc-800 px-4 sm:px-5">
                {sessions.map(([session, sessionQuestions], conceptIndex) => (
                  <details
                    key={`${level}-${session}`}
                    open={levelIndex === 0 && conceptIndex === 0}
                    className="border-b border-zinc-800 last:border-b-0"
                  >
                    <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2 py-4">
                      <span className="font-medium text-zinc-200">{session}</span>
                      <span className="ml-auto text-xs text-zinc-500">
                        {sessionQuestions.length} questions
                      </span>
                    </summary>
                    <div className="pb-4">
                      {sessionQuestions.map((question) => (
                        <QuestionLink key={question.id} question={question} query={search} />
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
