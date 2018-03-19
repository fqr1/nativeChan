const board = 'https://a.4cdn.org/boards.json'
const threads = (boardParam) => `https://a.4cdn.org/${boardParam}/threads.json`
const content = (boardParam, thread) => `https://a.4cdn.org/${boardParam}/thread/${thread}.json`
const catalog = (boardParam) => `https://a.4cdn.org/${boardParam}/catalog.json`

export const getBoard = () => {
  return fetch(board).then(r => {
    console.log('GOT BOARD - ', r);
    return r.json();
  })
}


export const getCatalog = (boardParam) => {
  console.log('WILL GET CATALOG');
  return fetch(catalog(boardParam)).then(r => {
    console.log('GOT CATALOG - ', r);
    return r.json();
  })
}

export const getThreads = (boardParam) => {
  return fetch(threads(boardParam)).then(r => {
    console.log('GOT THREADS - ', r);
    return r.json();
  })
}

export const getContent = (boardParam, thread) => {
  return fetch(content(boardParam, thread)).then(r => {
    console.log('GOT CONTENT - ', r);
    return r.json();
  })
}
