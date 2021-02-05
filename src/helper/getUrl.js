const getUrl = (searchQuery) => {
  const url =
    typeof searchQuery === 'string'
      ? `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchQuery}&api_key=NRCvlMq3AYBkfsUzfjDzpqUD36qK5abJfLpaJfJy&pageSize=3&pageNumber=1`
      : `https://api.nal.usda.gov/fdc/v1/food/${searchQuery}?api_key=NRCvlMq3AYBkfsUzfjDzpqUD36qK5abJfLpaJfJy`;

  return url;
};

export default getUrl;
