import Link from "next/link";

export default function ContributePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-zinc-800 pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-400">
          Community contributions
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Contribute to ELabVault
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
          Know the answer? Help someone find it. Get recognized for your contribution.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
          Students can share original solutions for questions that do not yet have answers. Send your
          submission directly to the maintainer; each one is reviewed before anything is added to the site.
        </p>
        <a
          href="https://t.me/walker_web"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          Submit a Solution <span aria-hidden="true">↗</span>
        </a>
        <p className="mt-3 text-xs text-zinc-500">
          Contact the maintainer on Telegram at @walker_web. No account or sign-up is needed.
        </p>
      </header>

      <section aria-labelledby="review-process">
        <h2 id="review-process" className="text-lg font-semibold text-zinc-100">
          From submission to publication
        </h2>
        <div className="mt-4 grid gap-5 border-y border-zinc-800 py-5 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">01 · Send</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">Share the solution and the question details with the maintainer.</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">02 · Review</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">The maintainer checks the submission. Sending it does not publish it automatically.</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">03 · Credit</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">Approved solutions are published with the contributor name or preferred display name.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">Include these details</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-300 marker:font-medium marker:text-emerald-300">
            <li>Question ID or question title</li>
            <li>Course and subject</li>
            <li>The complete solution</li>
            <li>Your name or preferred display name for attribution</li>
            <li>College and year, if you would like them included</li>
          </ol>
        </div>

        <aside className="border-l border-zinc-800 pl-5">
          <h2 className="text-lg font-semibold text-zinc-100">Original work and permission</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Submit work you created yourself, or material you have permission to share. Approved
            contributions are credited near their solution. A submission is not displayed on ELabVault
            unless the maintainer reviews and publishes it.
          </p>
        </aside>
      </section>

      <div className="border-t border-zinc-800 pt-5">
        <Link href="/courses/c-programming" className="text-sm font-medium text-emerald-300 transition hover:text-emerald-200">
          Browse C programming questions <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}