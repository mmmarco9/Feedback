import { useState, FormEvent } from "react";

import { ArrowLeft } from "phosphor-react";
import { CloseButton } from "../widget/CloseButton";

import { ScreenShotButton } from "../ScreenShotButton";
import { FeedbackType, feedbackTypes } from "../widget/WidgetForm";
import { api } from "../../services/api/api";
import { Loading } from "../Loading";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendFeedback, setIsSendFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault();
    setIsSendFeedback(true);
    await api.post("/feedbacks", {
      type: feedbackType,
      comment,
      screenshot,
    });

    setIsSendFeedback(false);

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          onClick={onFeedbackRestartRequested}
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[384px] w-full min-h-[112px] resize-none focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md scrollbar scrollbar-thumb-zinc-700"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(e) => setComment(e.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenShotButton
            screenShot={screenshot}
            onScreenShotTook={setScreenshot}
          />
          <button
            disabled={comment.length === 0 || isSendFeedback}
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none  focus:ring-2  focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50  disabled:hover:bg-brand-500"
          >
            {isSendFeedback ? <Loading /> : "Enviar Feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
