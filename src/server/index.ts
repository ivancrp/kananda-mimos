import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // Use uma senha de app do Gmail
  }
});

app.post('/api/send-email', [
  body('email').isEmail(),
  body('name').notEmpty(),
  body('phone').notEmpty(),
  body('description').notEmpty()
], async (req, res) => {
  console.log('Recebida nova requisição de email:', req.body);
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, description } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'kanandav19@gmail.com',
      subject: 'Nova Solicitação de Orçamento',
      html: `
        <h2>Nova Solicitação de Orçamento</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Descrição:</strong> ${description}</p>
      `
    });

    res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ error: 'Erro ao enviar email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Configurações de email:', {
    user: process.env.EMAIL_USER,
    // Não log a senha por questões de segurança
  });
}); 