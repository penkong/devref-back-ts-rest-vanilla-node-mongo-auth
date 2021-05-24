import nodemailer from 'nodemailer'

export class Email {
  to: string
  firstname: string
  from: string

  constructor(
    public info: { email: string; name: string },
    public url: string
  ) {
    this.to = info.email
    this.firstname = this.info.name
    this.url = url
    this.from = `security@devref.ir`
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      })
    }

    return nodemailer.createTransport({
      // host: process.env.EMAIL_HOST,
      // port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  // Send the email
  async send(template: string, subject: string) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: template
    }

    await this.newTransport().sendMail(mailOptions)
  }
}
