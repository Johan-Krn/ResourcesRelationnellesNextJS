"use client";

import SharePost from "@/components/Blog/SharePost";
import { fetchAPI } from "@/lib/fetch-api";
import { MetaPost, Resource } from "@/lib/model";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const ResourceSlugPage = ({
	params,
}: {
	params: { category: string; resourceSlug: string };
}) => {
	console.log(params);
	const [meta, setMeta] = useState<MetaPost | undefined>();
	const [data, setData] = useState<Resource>();
	const [isLoading, setLoading] = useState(true);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
			const path = `/resources`;
			const urlParamsObject = {
				filters: {
					slug: params.resourceSlug,
				},
				sort: { createdAt: "desc" },
				populate: {
					author: { fields: ["username"] },
					cover: { fields: ["url"] },
					category: { populate: "*" },
				},
			};
			const options = { headers: { Authorization: `Bearer ${token}` } };
			const responseData = await fetchAPI(path, urlParamsObject, options);

			setData(responseData.data[0] || null);
			setMeta(responseData.meta);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (isLoading) return <p className="flex justify-center">Chargement...</p>;

	if (!data)
		return <p className="flex justify-center">Aucune ressource trouvé.</p>;

	console.log(data);

	return (
		<>
			<section className="pt-[150px] pb-[120px]">
				<div className="container">
					<div className="-mx-4 flex flex-wrap justify-center">
						<div className="w-full px-4 lg:w-8/12">
							<div>
								<h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
									{data.attributes.title}
								</h2>
								<div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
									<div className="flex flex-wrap items-center">
										<div className="mr-10 mb-5 flex items-center">
											<div className="mr-4">
												<div className="relative h-10 w-10 overflow-hidden rounded-full">
													<Image
														src={`https://ui-avatars.com/api/?background=random&name=${data.attributes.author.data.attributes.username}`}
														alt={
															data.attributes
																.author.data
																.attributes
																.username
														}
														fill
													/>
												</div>
											</div>
											<div className="w-full">
												<h4 className="mb-1 text-base font-medium text-body-color">
													Par
													<span className="ml-2">
														{
															data.attributes
																.author.data
																.attributes
																.username
														}
													</span>
												</h4>
											</div>
										</div>
										<div className="mb-5 flex items-center">
											<p className="mr-5 flex items-center text-base font-medium text-body-color">
												<span className="mr-3">
													<svg
														width="15"
														height="15"
														viewBox="0 0 15 15"
														className="fill-current"
													>
														<path d="M3.89531 8.67529H3.10666C2.96327 8.67529 2.86768 8.77089 2.86768 8.91428V9.67904C2.86768 9.82243 2.96327 9.91802 3.10666 9.91802H3.89531C4.03871 9.91802 4.1343 9.82243 4.1343 9.67904V8.91428C4.1343 8.77089 4.03871 8.67529 3.89531 8.67529Z" />
														<path d="M6.429 8.67529H5.64035C5.49696 8.67529 5.40137 8.77089 5.40137 8.91428V9.67904C5.40137 9.82243 5.49696 9.91802 5.64035 9.91802H6.429C6.57239 9.91802 6.66799 9.82243 6.66799 9.67904V8.91428C6.66799 8.77089 6.5485 8.67529 6.429 8.67529Z" />
														<path d="M8.93828 8.67529H8.14963C8.00624 8.67529 7.91064 8.77089 7.91064 8.91428V9.67904C7.91064 9.82243 8.00624 9.91802 8.14963 9.91802H8.93828C9.08167 9.91802 9.17727 9.82243 9.17727 9.67904V8.91428C9.17727 8.77089 9.08167 8.67529 8.93828 8.67529Z" />
														<path d="M11.4715 8.67529H10.6828C10.5394 8.67529 10.4438 8.77089 10.4438 8.91428V9.67904C10.4438 9.82243 10.5394 9.91802 10.6828 9.91802H11.4715C11.6149 9.91802 11.7105 9.82243 11.7105 9.67904V8.91428C11.7105 8.77089 11.591 8.67529 11.4715 8.67529Z" />
														<path d="M3.89531 11.1606H3.10666C2.96327 11.1606 2.86768 11.2562 2.86768 11.3996V12.1644C2.86768 12.3078 2.96327 12.4034 3.10666 12.4034H3.89531C4.03871 12.4034 4.1343 12.3078 4.1343 12.1644V11.3996C4.1343 11.2562 4.03871 11.1606 3.89531 11.1606Z" />
														<path d="M6.429 11.1606H5.64035C5.49696 11.1606 5.40137 11.2562 5.40137 11.3996V12.1644C5.40137 12.3078 5.49696 12.4034 5.64035 12.4034H6.429C6.57239 12.4034 6.66799 12.3078 6.66799 12.1644V11.3996C6.66799 11.2562 6.5485 11.1606 6.429 11.1606Z" />
														<path d="M8.93828 11.1606H8.14963C8.00624 11.1606 7.91064 11.2562 7.91064 11.3996V12.1644C7.91064 12.3078 8.00624 12.4034 8.14963 12.4034H8.93828C9.08167 12.4034 9.17727 12.3078 9.17727 12.1644V11.3996C9.17727 11.2562 9.08167 11.1606 8.93828 11.1606Z" />
														<path d="M11.4715 11.1606H10.6828C10.5394 11.1606 10.4438 11.2562 10.4438 11.3996V12.1644C10.4438 12.3078 10.5394 12.4034 10.6828 12.4034H11.4715C11.6149 12.4034 11.7105 12.3078 11.7105 12.1644V11.3996C11.7105 11.2562 11.591 11.1606 11.4715 11.1606Z" />
														<path d="M13.2637 3.3697H7.64754V2.58105C8.19721 2.43765 8.62738 1.91189 8.62738 1.31442C8.62738 0.597464 8.02992 0 7.28906 0C6.54821 0 5.95074 0.597464 5.95074 1.31442C5.95074 1.91189 6.35702 2.41376 6.93058 2.58105V3.3697H1.31442C0.597464 3.3697 0 3.96716 0 4.68412V13.2637C0 13.9807 0.597464 14.5781 1.31442 14.5781H13.2637C13.9807 14.5781 14.5781 13.9807 14.5781 13.2637V4.68412C14.5781 3.96716 13.9807 3.3697 13.2637 3.3697ZM6.6677 1.31442C6.6677 0.979841 6.93058 0.716957 7.28906 0.716957C7.62364 0.716957 7.91042 0.979841 7.91042 1.31442C7.91042 1.649 7.64754 1.91189 7.28906 1.91189C6.95448 1.91189 6.6677 1.6251 6.6677 1.31442ZM1.31442 4.08665H13.2637C13.5983 4.08665 13.8612 4.34954 13.8612 4.68412V6.45261H0.716957V4.68412C0.716957 4.34954 0.979841 4.08665 1.31442 4.08665ZM13.2637 13.8612H1.31442C0.979841 13.8612 0.716957 13.5983 0.716957 13.2637V7.16957H13.8612V13.2637C13.8612 13.5983 13.5983 13.8612 13.2637 13.8612Z" />
													</svg>
												</span>
												{data.attributes.createdAt}
											</p>
											{/* <p className="mr-5 flex items-center text-base font-medium text-body-color">
												<span className="mr-3">
													<svg
														width="18"
														height="13"
														viewBox="0 0 18 13"
														className="fill-current"
													>
														<path d="M15.6375 0H1.6875C0.759375 0 0 0.759375 0 1.6875V10.6875C0 11.3062 0.309375 11.8406 0.84375 12.15C1.09687 12.2906 1.40625 12.375 1.6875 12.375C1.96875 12.375 2.25 12.2906 2.53125 12.15L5.00625 10.7156C5.11875 10.6594 5.23125 10.6312 5.34375 10.6312H15.6094C16.5375 10.6312 17.2969 9.87187 17.2969 8.94375V1.6875C17.325 0.759375 16.5656 0 15.6375 0ZM16.3406 8.94375C16.3406 9.3375 16.0312 9.64687 15.6375 9.64687H5.37187C5.09062 9.64687 4.78125 9.73125 4.52812 9.87187L2.05313 11.3063C1.82812 11.4187 1.575 11.4187 1.35 11.3063C1.125 11.1938 1.0125 10.9688 1.0125 10.7156V1.6875C1.0125 1.29375 1.32188 0.984375 1.71563 0.984375H15.6656C16.0594 0.984375 16.3687 1.29375 16.3687 1.6875V8.94375H16.3406Z" />
														<path d="M12.2342 3.375H4.69668C4.41543 3.375 4.19043 3.6 4.19043 3.88125C4.19043 4.1625 4.41543 4.3875 4.69668 4.3875H12.2623C12.5435 4.3875 12.7685 4.1625 12.7685 3.88125C12.7685 3.6 12.5154 3.375 12.2342 3.375Z" />
														<path d="M11.0529 6.55322H4.69668C4.41543 6.55322 4.19043 6.77822 4.19043 7.05947C4.19043 7.34072 4.41543 7.56572 4.69668 7.56572H11.0811C11.3623 7.56572 11.5873 7.34072 11.5873 7.05947C11.5873 6.77822 11.3342 6.55322 11.0529 6.55322Z" />
													</svg>
												</span>
												50
											</p> */}
										</div>
									</div>
									<div className="mb-5">
										<a
											href={`/resources/${data.attributes.category.data.attributes.slug}`}
											className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold text-white"
										>
											{
												data.attributes.category.data
													.attributes.name
											}
										</a>
									</div>
								</div>
								<div>
									<p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed"></p>

									<div className="mb-10 w-full overflow-hidden rounded">
										<div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
											<Image
												src={data.attributes.imageUrl}
												alt={data.attributes.title}
												fill
												className="object-cover object-center"
											/>
										</div>
									</div>

									<p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
										{data.attributes.content}
									</p>

									<div className="items-center justify-between sm:flex">
										<div className="mb-5"></div>
										<div className="mb-5">
											<h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
												Partagé la ressource
											</h5>
											<div className="flex items-center sm:justify-end">
												<SharePost />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ResourceSlugPage;
