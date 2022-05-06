import { MailAdapter } from './../adapters/mail-adapter';
import { FeedbacksRepository } from './../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest{
  type: string,
  comment: string,
  screenshot?: string
}


export class SubmitFeedbackUseCase {
  
  constructor (
    private feedbacksRepository : FeedbacksRepository,
    private mailAdapter : MailAdapter
  ) { }

  async execute(reqeust : SubmitFeedbackUseCaseRequest){
    const { type, comment, screenshot } = reqeust;

    if(!type){
      throw new Error('Type is required')
    }

    if(!comment){
      throw new Error('Comment is required')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid Screenshot Format')
    }

    await this.feedbacksRepository.create({
      type,
      comment, 
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size:16px; color: #111;">`,
        `<p>Tipo do Feedback : ${type}</p> `,
        `<p>Comentario : ${comment}</p>`,
        `</div>`,
        screenshot ? `<img src="${screenshot}"/ style="width:100%">` : null
      ].join('\n'),
    })
  }
}