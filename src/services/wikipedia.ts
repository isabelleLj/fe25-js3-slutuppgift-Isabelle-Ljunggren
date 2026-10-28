
async function fetchWikipediaSummary(
  countryName: string,
): Promise<WikipediaResponse> {
  const title = encodeURIComponent(countryName);

  const response = await fetch(
    `https://sv.wikipedia.org/api/rest_v1/page/summary/${title}`,
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta information från Wikipedia");
  }

  return response.json();
}

export { fetchWikipediaSummary };

