import html2canvas from "html2canvas";

export const takeScreenShot = () => {
    const element = document.getElementById("editSec_midSec");

    if (!element) {
        return Promise.reject("Element not found");
    }

    return html2canvas(element)
        .then((canvas) => {
            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    const formData = new FormData();
                    formData.append("image", blob, "screenshot.jpg");
                    resolve(formData);
                }, "image/jpeg");
            });
        })
        .catch((err) => {
            console.log("Unable to take screenshot at the moment:", err);
            return Promise.reject(err);
        });
};