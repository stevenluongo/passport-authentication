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

    const { user } = payload;

    //generate verification hash
    const hash = generateVerificationHash();

    //generate URL for email verification
    const url = `${baseURL}/verify?uid=${user._id.toString()}&hash=${hash}`;

    //set api key
    mail.setApiKey(process.env.SENDGRID_API_KEY);

    //format email body
    const body = `
      <div>
        <h1> Hi ${user.username}, </h1>
        <p>Thank you for signing up with next.js ecommerce !</p>
        <p>To further enjoy your account, please verify your email <a href=${url}>here</a> or click the link below: <p>
        <a href=${url}>${url}</a>
      </div> 
    `;

    //format message
    const msg = {
      to: user.emailAddress,
      from: 'juxtadevelopment@gmail.com',
      subject: `Confirm your email address`,
      text: 'sending from sendgrid!!',
      html: body,
    };

    //send email
    await mail.send(msg);

    return this.createVerificationSessionRepository.createVerificationSession({
      userId: user._id,
      hash,
    });
  }
}
