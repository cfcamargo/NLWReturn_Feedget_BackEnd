import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import express from 'express';


export const routes = express.Router()


 routes.post('/feedbacks', async (req, res) => {

  const { type, comment, screenshot } = req.body;
  const nodemailerMailAdapter = new NodemailerMailAdapter

  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  )

  await submitFeedbackUseCase.execute({
    type, 
    comment, 
    screenshot
  });


  

  return res.status(201).send();
});