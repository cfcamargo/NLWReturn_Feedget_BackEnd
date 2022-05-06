import exp from "constants";
import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbaclSpie = jest.fn();
const sendMailSpie = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbaclSpie},
  { sendMail: sendMailSpie}
)


describe('Submit feedback', () => {
  it('shoul be  able to submit feedback',async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64image',
    })).resolves.not.toThrow()

    expect(createFeedbaclSpie).toHaveBeenCalled();
    expect(sendMailSpie).toHaveBeenCalled();

  })

  it('shoul not be able to submit feedback whithout type',async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64image',
    })).rejects.toThrow();
  })


  it('shoul not be able to submit feedback whithout invalid screenshot',async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Exapmle Comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  })

  it('shoul not be able to submit feedback whithout comment',async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64image',
    })).rejects.toThrow();
  })


})