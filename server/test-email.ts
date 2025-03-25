import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // enviando para você mesmo como teste
      subject: 'Teste de Configuração do Nodemailer',
      text: 'Se você recebeu este email, a configuração do Nodemailer está funcionando!'
    });

    console.log('Email de teste enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar email de teste:', error);
  }
}

testEmail(); 