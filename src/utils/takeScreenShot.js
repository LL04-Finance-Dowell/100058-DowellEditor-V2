import html2canvas from "html2canvas";

export const takeScreenShot = () => {
    const element = document.getElementById("editSec_midSec");

    if (!element) {
        return Promise.reject("Element not found");
    }

    return html2canvas(element)
        .then((canvas) => {
            return canvas.toDataURL("image/jpeg");
        })
        .catch((err) => {
            console.log("Unable to take screenshot at the moment:", err);
            return Promise.reject(err);
        });
};
