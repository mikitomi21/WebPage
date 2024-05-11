type FetchResult = {
	response: Response;
	status: number;
};

export default async function useFetch(
	endpoint: string,
	method: 'GET' | 'POST' | "PATCH",
    headers: any,
	payload?: any
): Promise<FetchResult> {
	const response = await fetch(`http://localhost:8000/api${endpoint}`, {
		method,
		headers,
		body: JSON.stringify(payload),
	});
	return { response, status: response.status };
}
