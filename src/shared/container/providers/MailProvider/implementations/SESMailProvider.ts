import nodemailer, { Transporter } from "nodemailer";
import { injectable, inject } from "tsyringe";

import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";

// TODO: Integrate AWS SES MailProvider
@injectable()
export default class SESMailProvider implements IMailProvider {
	private client: Transporter;

	constructor(
		@inject("MailTemplateProvider")
		private mailTemplateProvider: IMailTemplateProvider
	) {}

	public async sendMail({
		to,
		subject,
		from,
		templateData,
	}: ISendMailDTO): Promise<void> {
		console.log("Working!");
	}
}
