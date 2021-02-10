/* Returns a URL, given searchQuery that is either:
    - a string, e.g. 'broccoli', for a list of search results
    - a number, e.g. '42115', for details on a particular result */

const getUrl = (searchQuery) => {
  const url =
    typeof searchQuery === 'string'
      ? `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchQuery}&api_key=NRCvlMq3AYBkfsUzfjDzpqUD36qK5abJfLpaJfJy&pageSize=3&pageNumber=1`
      : `https://api.nal.usda.gov/fdc/v1/food/${searchQuery}?api_key=NRCvlMq3AYBkfsUzfjDzpqUD36qK5abJfLpaJfJy`;

  return url;
};

export default getUrl;
