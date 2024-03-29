"use server";
import { cookies } from "next/headers";
import {
	RegisterFormSchema,
	RegisterFormSchemaType,
	ResponseAuth,
	UserSchema,
} from "./type";

export async function registerAction(
	values: RegisterFormSchemaType
): Promise<ResponseAuth> {
	const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
	if (!NEXT_PUBLIC_API_URL)
		throw new Error(
			"Variable d'environnement NEXT_PUBLIC_API_URL manquante."
		);

	const url = `${NEXT_PUBLIC_API_URL}/api/auth/local/register`;
	const validatedFields = RegisterFormSchema.safeParse({
		username: values.username,
		email: values.email,
		password: values.password,
	});

	if (!validatedFields.success) {
		return {
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Veuillez remplir tous les champs",
		};
	}

	const { username, email, password } = validatedFields.data;

	try {
		const response: any = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
			cache: "no-cache",
		});

		const data = await response.json();

		if (!response.ok && data.error)
			return {
				success: false,
				message: data.error.message,
			};

		if (response.ok && data.jwt) {
			const validatedUser = UserSchema.safeParse(data.user);

			if (!validatedUser.success) {
				return {
					success: false,
					message:
						"Une erreur inconnue est survenue lors de la connexion veuillez recharger la page !",
					errors: validatedUser.error.flatten().fieldErrors,
				};
			}

			cookies().set("jwt", data.jwt);

			return {
				success: true,
				message: "Vous êtes bien inscrit :)",
				user: data.user,
			};
		}
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: "Erreur de serveur, veuillez réessayer plus tard.",
		};
	}

	return {
		success: false,
		message:
			"Une erreur inconnue est survenue lors de la connexion veuillez recharger la page !",
	};
}
