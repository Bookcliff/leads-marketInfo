const fetch = require("node-fetch");

export default async function handler(request, response) {
  const result = await fetch(
    `https://opensheet.elk.sh/1hlG8Co8jxmy1B3JmIl0u1E7KiAnpiOnyVIQiaHHhCoU/companiesDaos`
  );
  const data = await result.json();

  return response.status(200).json({
    data,
  });
}
