import Link from "next/link";

import { courseSummary } from "@/lib/questions";

export function QuestionLanding() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          ELabVault
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
          Built by{" "}
          <a
            href="https://github.com/bhuvii16"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-zinc-300 transition hover:text-emerald-300"
          >
            bhuvii16
          </a>
        </p>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
          A companion to SRM ELab for practicing C programming questions by level and concept, with clear solutions and explanations at the heart of the learning experience.
        </p>
        <Link href="/contribute" className="mt-4 inline-flex text-sm font-medium text-emerald-300 transition hover:text-emerald-200">
          Contribute a solution <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </header>

      <section id="courses" className="mt-2">
        <h2 className="mb-5 text-2xl font-semibold text-zinc-50">Courses</h2>

        <div className="grid max-w-3xl gap-5">
          {courseSummary
            .filter((course) => course.status === "available")
            .map((course) => (
              <Link
                key={course.slug}
                href="/courses/c-programming"
                className="group rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:border-emerald-500/60 hover:bg-zinc-900"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                    Available
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-zinc-400">
                    {course.questionCount} Questions
                  </span>
                </div>

                <h3 className="mt-6 text-3xl font-semibold text-zinc-50">{course.name}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-300">
                  Work through SRM ELab practice organized around C programming levels and concepts.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-300">
                  Open course
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
        </div>
      </section>

        <section id="more" className="mt-10 border-t border-zinc-800 pt-8">
          <h2 className="mb-5 text-2xl font-semibold text-zinc-50">More</h2>
          <div className="grid max-w-3xl gap-5">
            <a
              href="https://github.com/bhuvii16/SRM-Elab-Paste/"
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:border-emerald-500/60 hover:bg-zinc-900"
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
                GitHub project
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-zinc-50">
                SRM eLab Paste Shortcut
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
                A Tampermonkey userscript that adds a Ctrl + Shift + V shortcut for pasting code into the
                SRM eLab editor, with a step-by-step setup guide.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition group-hover:text-emerald-200">
                View repository <span aria-hidden="true">↗</span>
              </div>
            </a>
          </div>
        </section>
    </main>
  );
}
