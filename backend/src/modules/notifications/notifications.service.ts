import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendSms(to: string, message: string) {
    // Dans un vrai projet, on utiliserait Twilio ou un provider local gabonais
    this.logger.log(`[SIMULATION SMS] Vers ${to} : ${message}`);
    return { status: 'sent', provider: 'mock-sms' };
  }

  async sendEmail(to: string, subject: string, body: string) {
    // Dans un vrai projet, on utiliserait SendGrid, SES ou Nodemailer
    this.logger.log(`[SIMULATION EMAIL] Vers ${to} [Sujet: ${subject}] : ${body}`);
    return { status: 'sent', provider: 'mock-email' };
  }
}
