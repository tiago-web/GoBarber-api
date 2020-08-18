import { Router } from "express";
import { container } from "tsyringe";

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
	const { email, password } = req.body;

	const userService = container.resolve(AuthenticateUserService);

	const { user, token } = await userService.execute({
		email,
		password,
	});

	delete user.password;

	return res.json({ user, token });
});

export default sessionsRouter;
