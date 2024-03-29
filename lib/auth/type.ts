import { z } from "zod";

const commonFormFields = {
	name: z.string().optional(),
	email: z.string().email({
		message: "Veuillez renseigner une adresse e-mail valide.",
	}),
	password: z.string().min(8, {
		message:
			"Le mot de passe doit avoir une taille de 8 caractères minimum.",
	}),
};

export const LoginFormSchema = z.object({
	...commonFormFields,
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = z.object({
	username: z.string().min(1, {
		message: "Veuillez remplir le champ.",
	}),
	...commonFormFields,
});

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

export const UserSchema = z.object({
	id: z.number(),
	username: z.string(),
	email: z.string(),
	provider: z.string(),
	confirmed: z.boolean(),
	blocked: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export type ResponseAuth = {
	success: boolean;
	message: string;
	errors?: object | null;
	user?: UserSchemaType;
};
