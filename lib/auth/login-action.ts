"use server";

import {
	LoginFormSchema,
	LoginFormSchemaType,
	ResponseAuth,
	UserSchema,
} from "./type";

export async function loginAction(
	values: LoginFormSchemaType
): Promise<ResponseAuth> {
	const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
	if (!NEXT_PUBLIC_API_URL)
		throw new Error(
			"Variable d'environnement NEXT_PUBLIC_API_URL manquante."
		);

	const url = `${NEXT_PUBLIC_API_URL}/api/auth/local`;
	const validatedFields = LoginFormSchema.safeParse({
		email: values.email,
		password: values.password,
	});

	if (!validatedFields.success) {
		//console.log(validatedFields.error.flatten().fieldErrors);
		return {
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Veuillez remplir tous les champs",
		};
	}

	const { email, password } = validatedFields.data;

	console.log(url);

	try {
		const response: any = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ identifier: email, password: password }),
		});
		console.log("[data] => ", response);

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

			//cookies().set("jwt", data.jwt);

			return {
				success: true,
				message: "Vous êtes bien connecté :)",
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
