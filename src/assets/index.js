const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC8LeXCWOalN8SxlrPcG-PaQ&part=snippet%2Cid&order=date&maxResults=9';
const contentContainer = document.getElementById("content")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aaf3a3cda5msh4a354b88b1bd076p17656ajsn36df550eb318',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

const fetchData = async (urlAPI) => {
  const response = await fetch(urlAPI, options)
  const data = await response.json()
  return data
}

const getData = async (API) => {
  try {
    const videos = await fetchData(API)
    console.log(videos.items);
    let htmlCode = `
    ${videos.items.map(video => `
      <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
    `).slice(0, 8).join('')} 
  `
  contentContainer.innerHTML += htmlCode
  } catch (error) {
    console.error(error)
  }
}

getData(API)