import { UserSchemaType } from "@/lib/auth/type";
import { cookies } from "next/headers";

export const isLoggedIn = async () => {
	const jwt = cookies().get("jwt");

	return !!jwt;
};

export const getJwt = async () => {
	const jwt = cookies().get("jwt");

	if (await isLoggedIn()) {
		return jwt?.value;
	} else {
		return null;
	}
};

export const getUser = async () => {
	const jwt = cookies().get("jwt");

	const STRAPI_URL = process.env.STRAPI_URL;
	if (!STRAPI_URL)
		throw new Error("Variable d'environnement STRAPI_URL manquante.");

	const url = `${STRAPI_URL}/api/users/me`;

	try {
		const response: any = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwt?.value}`,
				"Content-Type": "application/json",
			},
			cache: "no-cache",
		});

		const user: UserSchemaType = await response.json();

		if (user) {
			return user;
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
};
