const baseUrl = 'http://yourServer.dummy/chan';
const apiVersion = '/api/v1';
const downloadUri = '/save';

const getDownloadUrl = () => `${baseUrl}${apiVersion}${downloadUri}`;

export const downloadContnetToServer = (board, id) => {
    const body = JSON.stringify({board, id});
    const fetchParam = {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
    }

    console.log(`+++ will fetch ${getDownloadUrl()} with params`, fetchParam)

    return fetch(getDownloadUrl(), fetchParam).then(r => {
        console.log('Download response - ', r);
        return r.json();
    })
}