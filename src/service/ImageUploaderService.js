import server from '../Server';
import FormData from 'form-data'

export const uploadImage = (file) => {
    const data = new FormData();
    data.append('image', file, file.name);
    return server.post('/images', data, {
        headers: {
            'accept': 'application/json',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
    })
}