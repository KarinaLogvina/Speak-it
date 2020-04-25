const getTranslation = async (word) => {
  const url = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20200423T213954Z.185646975c1daf2b.781b3e2d0efa6105615b0ae38cf71ed64e7908ca&text=${word}&lang=en-ru`;
  const res = await fetch(url);
  const json = await res.json();
  return json.def[0].tr.slice(0, 2).map((tr) => tr.text).join(', ');
};

export default getTranslation;
