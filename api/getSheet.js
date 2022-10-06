const fetch = require("node-fetch");

export default async function handler(request, response) {
  const result = await fetch(
    `https://opensheet.elk.sh/16qbIhF4iAF1ao7X59QZKqZvwi6tG0VbEXz1hWfdC3mI/Sheet1`
  );
  const data = await result.json();

  return response.status(200).json({
    data,
  });
}
