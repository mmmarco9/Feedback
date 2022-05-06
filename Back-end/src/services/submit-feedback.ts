import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemail-mail-adapter";
import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks-repository";


interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: PrismaFeedbacksRepository,
        private mailAdapter: NodemailerMailAdapter
    ) { }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;


        await this.feedbacksRepository.create({ type, comment, screenshot });

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-size: sans-serif; font-size: 16px; color: #111">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`,
            ].join("\n"),
        });
    }
}