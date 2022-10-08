const fetch = require("node-fetch");

export default async function handler(request, response) {
  const { page, id } = request.query;

  const result = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=250&sparkline=false`
  );
  const data = await result.json();
  return response.status(result.status).json({
    data,
  });
}
