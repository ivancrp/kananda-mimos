import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL do seu frontend Vite
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Configuração do transportador SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true para porta 465, false para outras portas
  auth: {
    user: process.env.EMAIL_USER, // seu email do Gmail
    pass: process.env.EMAIL_APP_PASSWORD // senha de app gerada
  }
});

// Rota para envio de email
app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, description } = req.body;

  try {
    // Verificar se todos os campos necessários estão presentes
    if (!name || !email || !phone || !description) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kanandav19@gmail.com',
      subject: `Nova Solicitação de Orçamento - ${name}`,
      html: `
        <h2>Nova Solicitação de Orçamento</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Descrição:</strong> ${description}</p>
      `,
      replyTo: email // Para que as respostas vão diretamente para o cliente
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Email enviado com sucesso!' 
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erro ao enviar email' 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 