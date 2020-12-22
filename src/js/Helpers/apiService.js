const PIXABAY_KEY = '19124280-93d625947beade68d0b63bb4e';

export async function fetchPixabayImages({
  searchWord,
  per_page = 12,
  page = 1,
}) {
  const request = await fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchWord}&page=${page}&per_page=${per_page}&key=${PIXABAY_KEY}`,
  );

  return await request.json();
}
