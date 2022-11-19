import { CreateVerificationSessionRepository } from '@application/interfaces/repositories/verification/createVerificationSessionRepository';
import {
  CreateVerificationSessionInterface,
  CreateVerificationSessionInterfaceNamespace,
} from '@application/interfaces/use-cases/verification/createVerificationSessionInterface';
import { baseURL } from '@domain/url';
import { generateVerificationHash } from '@main/helpers/hash';
import mail from '@sendgrid/mail';

export class CreateVerificationSession
  implements CreateVerificationSessionInterface
{
  constructor(
    private readonly createVerificationSessionRepository: CreateVerificationSessionRepository
  ) {}

  async execute(
    payload: CreateVerificationSessionInterfaceNamespace.Request
  ): Promise<CreateVerificationSessionInterfaceNamespace.Response> {
    //our logic here

    const { _id: userId, emailAddress, username } = payload;

    //generate verification hash
    const hash = generateVerificationHash();

    //generate URL for email verification
    const url = `${baseURL}/verify?uid=${userId.toString()}&hash=${hash}`;

    //set api key
    mail.setApiKey(process.env.SENDGRID_API_KEY);

    //format email body
    const body = `
      <div>
        <h1> Hi ${username}, </h1>
        <p>Thank you for signing up with next.js ecommerce !</p>
        <p>To further enjoy your account, please verify your email <a href=${url}>here</a> or click the link below: <p>
        <a href=${url}>${url}</a>
      </div> 
    `;

    //format message
    const msg = {
      to: emailAddress,
      from: 'juxtadevelopment@gmail.com',
      subject: `Confirm your email address`,
      text: 'sending from sendgrid!!',
      html: body,
    };

    //send email
    try {
      await mail.send(msg);
    } catch (e) {
      console.error(e.message);
    }

    return this.createVerificationSessionRepository.createVerificationSession({
      userId,
      hash,
    });
  }
}
