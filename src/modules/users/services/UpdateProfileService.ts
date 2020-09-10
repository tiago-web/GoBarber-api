import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

import User from "../infra/typeorm/entities/User";

interface IRequest {
	user_id: string;
	name: string;
	email: string;
	old_password?: string;
	password?: string;
}

@injectable()
class UpdateProfile {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,

		@inject("HashProvider")
		private hashProvider: IHashProvider
	) {}

	public async execute({
		user_id,
		name,
		email,
		password,
		old_password,
	}: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError("User not found.");
		}

		const userRegisteredWithUpdatingEmail = await this.usersRepository.findByEmail(
			email
		);

		if (
			userRegisteredWithUpdatingEmail &&
			userRegisteredWithUpdatingEmail.id !== user.id
		) {
			throw new AppError("E-mail already in use");
		}

		user.name = name;
		user.email = email;

		if (password && !old_password) {
			throw new AppError("Old password is required to set a new password");
		}

		if (password) {
			user.password = await this.hashProvider.generateHash(password);
		}

		return this.usersRepository.save(user);
	}
}

export default UpdateProfile;
