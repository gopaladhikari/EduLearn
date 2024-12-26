import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import * as path from 'path';
import * as fs from 'fs';

type Templates = 'forgotPassword.html' | 'verifyEmail.html';
type Placeholders = { [key: string]: string };

@Injectable()
export class MailService {
  private readonly resend: Resend;
  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(
      this.configService.getOrThrow('RESEND_API_KEY'),
    );
  }

  async loadTemplate(
    templateName: Templates,
    placeholders: Placeholders,
  ) {
    const templatePath = path.join(
      process.cwd(),
      'src/modules/mail/emails',
      templateName,
    );

    let template = fs.readFileSync(templatePath, 'utf8');

    for (const key in placeholders) {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      template = template.replace(regex, placeholders[key]);
    }

    return template;
  }

  async sendRequestForgotPasswordMail(
    fullName: string,
    email: string,
    accessToken: string,
  ) {
    try {
      const html = await this.loadTemplate('forgotPassword.html', {
        RESET_LINK: `https://localhost:3000/forgot-password?token=${accessToken}`,
        Name: fullName ?? 'User',
      });
      const { data, error } = await this.resend.emails.send({
        from: 'E-Learning <e-learning@gopal-adhikari.com.np>',
        to: [email],
        subject: 'Request forgot password',
        html: html,
      });

      if (error)
        throw new HttpException('Sending email failed', 500, {
          cause: new Error(),
          description: error.message,
        });

      return {
        status: 'ok',
        data,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async sendConfirmForgotPasswordMail(
    token: string,
    password: string,
  ) {}

  async sendResetPasswordMail(
    oldPassword: string,
    newPassword: string,
  ) {}
}
