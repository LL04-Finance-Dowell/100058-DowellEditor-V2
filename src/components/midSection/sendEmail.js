import axios from "axios"
import { toast } from "react-toastify"

var interval;
const animateDots = (loadingDotsElement, dotCount, cancel = false) => {

    if (cancel) {
        clearInterval(interval);
        loadingDotsElement.innerHTML = 'Configure Mail';
    } else {
        loadingDotsElement.innerHTML = 'sending';
        let count = 0;
        interval = setInterval(() => {
            loadingDotsElement.innerHTML += '.';
            count++;
            if (count === dotCount) {
                count = 0;
                loadingDotsElement.innerHTML = 'sending';
            }
        }, 300);
    }
}
export const sendEmail = (formData, buttonField,setSideBar) => {
    let data = formData;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://100085.pythonanywhere.com/api/uxlivinglab/email/',
        data: data
    };
    animateDots(buttonField, 4)
    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            animateDots(buttonField, 6, true)
            toast.success('email sent successfully');
            setSideBar(false)
        })
        .catch((error) => {
            console.log(error);
            toast.error("email not sent")
            animateDots(buttonField, 7, true)
        });

}