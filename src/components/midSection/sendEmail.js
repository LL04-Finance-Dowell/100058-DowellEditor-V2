import axios from "axios"
import { downloadPDF, generatePDF } from "../../utils/genratePDF";
import { toast } from "react-toastify";
import { pdf } from "@react-pdf/renderer";

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
};

const generateHTML = async (link) => {
    const htmlTemplate = ` 
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DoWell WorkFlow AI Email</title>
    </head>

    <body
        style="
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
        "
    >
        <div style="width: 100%; background-color: #ffffff">
            <header
                style="
                color: #fff;
                display: flex;
                text-align: center;
                justify-content: center;
                padding: 5px;
                "
            >
                <img
                src="https://dowellfileuploader.uxlivinglab.online/hr/logo-2-min-min.png"
                height="140px"
                width="140px"
                style="display: block; margin: 0 auto"
                />
            </header>

            <main style="padding: 20px; display: grid; place-items: center">
                <section style="margin: 20px; display: grid; text-align: center;font-size:1.2rem">
                <p>
                    A document has been shared with you, please click the button
                    below to open the document
                </p>
                <a href="${link}" style="text-decoration:none;font-weight:700;width:max-content;text-align: center;margin:1.2rem auto;padding: 2em 4em; background-color: #005733;color: #fff;">Open document</a>
                </section>
            </main>

            <footer
                style="
                background-color: #005733;
                color: #fff;
                text-align: center;
                padding: 25px;
                "
            >
                <a
                href="https://www.uxlivinglab.org/"
                style="
                    text-align: center;
                    color: white;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    text-decoration: none;
                "
                >
                DoWell UX Living Lab
                </a>
                <p style="margin-top: 10px; font-size: 12px">
                &copy; 2023-All rights reserved.
                </p>
            </footer>
        </div>
    </body>
    </html>
  `
    return htmlTemplate;

}

const getEmailPayLoad = async (midsectionNode) => {


    if (midsectionNode) {
        const id = midsectionNode.details._id;
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://100058.pythonanywhere.com/api/generate-pdf-link/',
            data: {
                item_id: id,
                item_type: midsectionNode.details.action
            }
        };

        try {
            const pdfURL = await axios.request(config);
            const emailTemplate = generateHTML(pdfURL.data)
            return emailTemplate;
        } catch (error) {
            console.log(error);
            toast.error("Error generating pdf")
            return null
        }

    } else {
        toast.error('[PDF-GENERATION]:NO TOKEN PROVIDED');
        return null
    }
}

export const sendEmail = async (formData, buttonField, setSideBar) => {
    animateDots(buttonField, 4);
    const { email_content, ...data } = formData;
    const htmlTemplate = await getEmailPayLoad(email_content)
    if (!htmlTemplate) {
        toast.error("error generating html")
        return;
    }
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://100085.pythonanywhere.com/api/uxlivinglab/email/',
        data: {
            ...data,
            email_content: htmlTemplate
        }
    };
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
