export class VerifyImage {
    static doesImageExists(url, callback) {
       return new Promise((resolve) => {
            const img = new Image();
            img.src = url;

            img.onload = () => resolve(url);
            img.onerror = () => resolve("../../Images/someone.jpg");
        });

    }
}