"use client";

import BlogList from "@/components/Blog/blog-list";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { fetchAPI } from "@/lib/fetch-api";
import { MetaPost } from "@/lib/model";
import { useCallback, useEffect, useState } from "react";

const CategoryRoute = ({ params }: { params: { category: string } }) => {
	const [meta, setMeta] = useState<MetaPost | undefined>();
	const [data, setData] = useState<any>([]);
	const [isLoading, setLoading] = useState(true);

	const fetchData = useCallback(async (start: number, limit: number) => {
		setLoading(true);
		try {
			const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
			const path = `/resources`;
			const urlParamsObject = {
				filters: {
					category: {
						slug: params.category,
					},
				},
				sort: { createdAt: "desc" },
				populate: {
					author: { fields: ["username"] },
					cover: { fields: ["url"] },
					category: { populate: "*" },
				},
				pagination: {
					start: start,
					limit: limit,
				},
			};
			const options = { headers: { Authorization: `Bearer ${token}` } };
			const responseData = await fetchAPI(path, urlParamsObject, options);

			if (start === 0) {
				setData(responseData.data);
			} else {
				setData((prevData: any[]) => [
					...prevData,
					...responseData.data,
				]);
			}

			setMeta(responseData.meta);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, []);

	function loadMorePosts(): void {
		const nextPosts = meta!.pagination.start + meta!.pagination.limit;
		fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
	}

	useEffect(() => {
		fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
	}, [fetchData]);

	if (isLoading) return <p className="flex justify-center">Chargement...</p>;

	console.log(data);

	return (
		<>
			<Breadcrumb
				pageName="Ressources"
				description={`Rechercher des ressources dans la catégorie : ${data[0].attributes.category.data?.attributes.name}`}
			/>

			<section className="pt-[120px] pb-[120px]">
				<div className="container">
					<BlogList data={data}>
						{meta!.pagination.start + meta!.pagination.limit <
							meta!.pagination.total && (
							<div className="mt-10 flex justify-center">
								<button
									type="button"
									className="dark:bg-gray-900 dark:text-gray-400 rounded-lg px-6 py-3 text-sm hover:underline"
									onClick={loadMorePosts}
								>
									Charger plus de ressources...
								</button>
							</div>
						)}
					</BlogList>
				</div>
			</section>
		</>
	);
};

export default CategoryRoute;
