import express, { Request, Response, RequestHandler } from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config';

dotenv.config();

const app = express();

// Configuração do CORS
app.use(cors({
  origin: config.corsOrigin,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Configuração do transportador SMTP
const transporter = nodemailer.createTransport({
  host: config.emailConfig.host,
  port: config.emailConfig.port,
  secure: config.emailConfig.secure,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: true
  },
  pool: true,
  maxConnections: config.emailConfig.maxConnections,
  maxMessages: config.emailConfig.maxMessages,
  socketTimeout: config.emailConfig.socketTimeout,
  logger: process.env.NODE_ENV !== 'production' // Logs apenas em desenvolvimento
});

// Verificar a conexão ao iniciar o servidor
transporter.verify(function(error, success) {
  if (error) {
    console.error('Erro na configuração do email:', error);
  } else {
    console.log('Servidor pronto para enviar emails');
  }
});

// Definindo a interface para o corpo da requisição
interface EmailRequest {
  name: string;
  email: string;
  phone: string;
  description: string;
}

// Corrigindo a tipagem da rota usando RequestHandler
const handler: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, description } = req.body as EmailRequest;

    // Verificar se todos os campos necessários estão presentes
    if (!name || !email || !phone || !description) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kanandamimos@gmail.com',
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
      error: process.env.NODE_ENV === 'production' 
        ? 'Erro ao enviar email' 
        : error.message 
    });
  }
};

app.post('/api/send-email', handler);

app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port} em modo ${process.env.NODE_ENV || 'development'}`);
}); 