export class VerifyImage {
    static doesImageExists(url, callback) {

        const img = new Image();
        img.src = url;
        
        img.onload = () => callback(true)
        img.onerror = () => callback(false)
        console.log(url, img.onload, img.onerror)
    }
}