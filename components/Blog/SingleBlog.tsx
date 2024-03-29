import Image from "next/image";
import Link from "next/link";

interface SingleBlogProps {
	title: string;
	content: string;
	cover: string;
	slug: string;
	authorName: string;
	categoryName: string;
	categorySlug: string;
	createdAt: string;
}

const SingleBlog = ({
	title,
	content,
	cover,
	slug,
	authorName,
	categoryName,
	categorySlug,
	createdAt,
}: SingleBlogProps) => {
	return (
		<div className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
			<div
				className="wow fadeInUp relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark"
				data-wow-delay=".1s"
			>
				<Link
					href={`/resources/${categorySlug}/${slug}`}
					className="relative block h-[220px] w-full"
				>
					<span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
						{categoryName}
					</span>
					<Image src={cover} alt="image" fill />
				</Link>
				<div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
					<h3>
						<Link
							href={`/resources/${categorySlug}/${slug}`}
							className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
						>
							{title}
						</Link>
					</h3>
					<p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
						{content}
					</p>
					<div className="flex items-center">
						<div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
							<div className="mr-4">
								<div className="relative h-10 w-10 overflow-hidden rounded-full">
									<Image
										src={`https://ui-avatars.com/api/?background=random&name=${authorName}`}
										alt={authorName}
										fill
									/>
								</div>
							</div>
							<div className="w-full">
								<h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
									By {authorName}
								</h4>
							</div>
						</div>
						<div className="inline-block">
							<h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
								Date
							</h4>
							<p className="text-xs text-body-color">
								{createdAt}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleBlog;
