const getTranslation = async (word) => {
  const url = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&text=${word}&lang=en-ru`;
  const res = await fetch(url);
  const json = await res.json();
  return json.def[0].tr.slice(0, 2).map((tr) => tr.text).join(', ');
};

export default getTranslation;
