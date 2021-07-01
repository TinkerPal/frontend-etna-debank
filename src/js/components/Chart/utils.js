import { BASE_URL, PARAMS, TOKEN_SLUG_MAPPER } from './constants';

export const getCoinData = async (coinName) => {
  if (!TOKEN_SLUG_MAPPER[coinName]) {
    return;
  }

  const data = await fetch(
    `${BASE_URL}/coins/${TOKEN_SLUG_MAPPER[coinName]}?${PARAMS}`
  ).then((response) => {
    return response.json();
  });

  return data;
};
