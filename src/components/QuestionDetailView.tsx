import Link from "next/link";

import { CopySolutionButton } from "@/components/CopySolutionButton";
import { getQuestionDisplayTitle, sanitizeHtml, type NormalizedQuestion } from "@/lib/questions";

type QuestionDetailViewProps = {
  question: NormalizedQuestion;
  previousQuestion: NormalizedQuestion | null;
  nextQuestion: NormalizedQuestion | null;
  allQuestions: NormalizedQuestion[];
};

export function QuestionDetailView({
  question,
  previousQuestion,
  nextQuestion,
}: QuestionDetailViewProps) {
  const descriptionHtml = sanitizeHtml(question.descriptionHtml);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Problem</p>
            <h1 className="mt-2 text-2xl font-semibold text-zinc-50 sm:text-3xl">
              {getQuestionDisplayTitle(question)}
            </h1>
          </div>

          <Link
            href="/courses/c-programming"
            className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500"
          >
            Back to questions
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-zinc-400">
          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1.5">Level {question.level}</span>
          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1.5">{question.session}</span>
          {question.tags.slice(0, 4).map((tag) => (
            <span key={`${question.id}-${tag}`} className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1.5">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-zinc-50">Question details</h2>
        <div className="html-content mt-4 text-base leading-8 text-zinc-200" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-zinc-50">Solution</h3>
            <div className="flex items-center gap-3">
              {question.solutionCode && <CopySolutionButton code={question.solutionCode} />}
            </div>
          </div>
          {question.solutionCode ? (
            <pre className="mt-4 overflow-x-auto rounded-lg border border-zinc-800 bg-black/30 p-4">
              <code className="font-mono text-sm leading-6 text-zinc-200">{question.solutionCode}</code>
            </pre>
          ) : question.contributedSolutions.length === 0 ? (
            <p className="mt-3 text-base leading-7 text-zinc-300">Solution coming soon.</p>
          ) : null}
          {question.contributedSolutions.map(({ solution, contributor, verified }, index) => (
            <div key={`${question.id}-contribution-${index}`} className="mt-5 border-t border-zinc-800 pt-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                    Community solution
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-100">{contributor.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {contributor.credit ?? "Solution contributor"}
                    {verified ? " · Reviewed and approved" : ""}
                  </p>
                </div>
                <CopySolutionButton code={solution} />
              </div>
              <pre className="mt-3 overflow-x-auto rounded-lg border border-zinc-800 bg-black/30 p-4">
                <code className="font-mono text-sm leading-6 text-zinc-200">{solution}</code>
              </pre>
            </div>
          ))}
          {!question.solutionCode && question.contributedSolutions.length === 0 && (
            <p className="mt-3 text-sm text-zinc-400">
              Have a solution?{" "}
              <Link href="/contribute" className="font-medium text-emerald-300 hover:text-emerald-200">
                Contribute to ELabVault
              </Link>
              . Every submission is reviewed before publication.
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-zinc-50">Explanation</h3>
          <p className="mt-3 text-base leading-7 text-zinc-300">
            {question.explanation ?? "Explanation coming soon."}
          </p>
        </section>
      </div>

      {question.testcases.length > 0 && (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-zinc-50">Sample test cases</h3>
          <div className="mt-4 space-y-4">
            {question.testcases.map((testCase, index) => (
              <div key={`${question.id}-case-${index}`} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Case {index + 1}</p>
                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.14em] text-zinc-500">Input</p>
                    <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-black/30 p-3 text-sm text-zinc-200">
                      {testCase.INPUT || "—"}
                    </pre>
                  </div>
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.14em] text-zinc-500">Output</p>
                    <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-black/30 p-3 text-sm text-zinc-200">
                      {testCase.OUTPUT || "—"}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {previousQuestion ? (
            <Link
              href={`/questions/${encodeURIComponent(previousQuestion.id)}`}
              className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500"
            >
              ← Previous
            </Link>
          ) : null}
        </div>

        <div>
          {nextQuestion ? (
            <Link
              href={`/questions/${encodeURIComponent(nextQuestion.id)}`}
              className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500"
            >
              Next →
            </Link>
          ) : null}
        </div>
      </div>
    </main>
  );
}
