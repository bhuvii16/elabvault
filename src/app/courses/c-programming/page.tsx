import { QuestionBrowser } from "@/components/QuestionBrowser";
import { cProgrammingQuestions } from "@/lib/questions";

export default function CProgrammingPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 border-b border-zinc-800 pb-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-400">Course</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50">C Programming</h1>
          </div>
          <div className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-300">
            {cProgrammingQuestions.length} questions
          </div>
        </div>
      </div>

      <QuestionBrowser questions={cProgrammingQuestions} />
    </main>
  );
}
