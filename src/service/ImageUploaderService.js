import server from '../Server';
import { storage } from "./FirebaseService";

export const uploadImage = async (file) => {
	if (file) {
		const res = await storage.ref(`/images/${file.name}`).put(file)
		const url = await res.ref.getDownloadURL()
		console.log(url)
		return url
	}
}
