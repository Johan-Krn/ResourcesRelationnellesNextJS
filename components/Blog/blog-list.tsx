import { getStrapiMedia } from "@/lib/api-helpers";
import { Resource } from "@/lib/model";
import SingleBlog from "./SingleBlog";

export default function PostList({
	data: resources,
	children,
}: {
	data: Resource[];
	children?: React.ReactNode;
}) {
	return (
		<>
			<div className="-mx-4 flex flex-wrap justify-center">
				{resources.map((resource) => {
					const imageUrl = getStrapiMedia(
						resource.attributes.cover.data?.attributes.url
					);

					const category =
						resource.attributes.category.data?.attributes;
					const authorName =
						resource.attributes.author.data?.attributes.username;
					return (
						<SingleBlog
							key={resource.id}
							title={resource.attributes.title}
							content={resource.attributes.content}
							slug={resource.attributes.slug}
							cover={resource.attributes.imageUrl}
							authorName={authorName}
							categoryName={category.name}
							categorySlug={category.slug}
							createdAt={resource.attributes.createdAt}
						/>
					);
				})}
			</div>
			{children}
		</>
	);
}
