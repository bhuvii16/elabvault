import { Suspense } from "react";
import { notFound } from "next/navigation";

import { QuestionDetailView } from "@/components/QuestionDetailView";
import { allQuestions } from "@/lib/questions";

export function generateStaticParams() {
  return allQuestions.map((question) => ({ id: question.id }));
}

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-zinc-400 sm:px-6 lg:px-8">
          Loading question...
        </div>
      }
    >
      <QuestionDetailContent params={params} />
    </Suspense>
  );
}

async function QuestionDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const questionIndex = allQuestions.findIndex((question) => question.id === decodedId);

  if (questionIndex === -1) {
    notFound();
  }

  const question = allQuestions[questionIndex];
  const previousQuestion = questionIndex > 0 ? allQuestions[questionIndex - 1] : null;
  const nextQuestion =
    questionIndex < allQuestions.length - 1 ? allQuestions[questionIndex + 1] : null;

  return (
    <QuestionDetailView
      question={question}
      previousQuestion={previousQuestion}
      nextQuestion={nextQuestion}
      allQuestions={allQuestions}
    />
  );
}
