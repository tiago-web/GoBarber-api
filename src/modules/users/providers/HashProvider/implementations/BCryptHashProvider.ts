import { hash, compare } from "bcryptjs";
import IHashProvider from "../models/IHashProvider";

export default class BCryptHashProvider implements IHashProvider {
	public async generateHash(payload: string): Promise<string> {
		// Should be 8
		return hash(payload, 5);
	}

	public async compareHash(payload: string, hashed: string): Promise<boolean> {
		return compare(payload, hashed);
	}
}
