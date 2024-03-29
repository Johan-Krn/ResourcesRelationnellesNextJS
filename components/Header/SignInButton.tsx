"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
	const { data: session } = useSession();

	if (session && session.user) {
		return (
			<button
				onClick={() => signOut()}
				className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
			>
				Déconnexion
			</button>
		);
	}
	return (
		<>
			<Link
				href="/signin"
				className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"
			>
				Connexion
			</Link>
			<Link
				href="/signup"
				className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
			>
				Inscription
			</Link>
		</>
	);
};

export default SigninButton;
