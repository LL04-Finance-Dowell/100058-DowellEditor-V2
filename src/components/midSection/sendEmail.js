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

function extractCSSFromNode(node) {
    let css = '';

    function extractInlineStyles(el) {
        const inlineStyles = el.getAttribute('style');
        if (inlineStyles) {
            css += `#${el.id} { ${inlineStyles} }\n`;
        }
    }

    node.querySelectorAll('*').forEach(extractInlineStyles);


    return css;
}


const getEmailTemplate = (midsection) => {
    const extractedCSS = extractCSSFromNode(midsection);
    const extractedHTML = midsection.outerHTML;
    const template = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DoWell WorkFlow AI Email</title>
        <style>${extractedCSS}</style>
    </head>

    <body style="
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
    ">
        <div style="width: 100%; background-color: #ffffff;">
            <header style="
                color: #fff;
                display: flex;
                text-align: center;
                justify-content: center;
                padding: 5px;
            ">
                <img src="https://dowellfileuploader.uxlivinglab.online/hr/logo-2-min-min.png" height="140px" width="140px"
                    style="display: block; margin: 0 auto;" />
            </header>

            <main style="padding: 20px; display:grid;place-items:center;">
                <section style="margin: 20px; display: grid; place-items: center;">
                ${extractedHTML}
                </section>
            </main>

            <footer style="
                background-color: #005733;
                color: #fff;
                text-align: center;
                padding: 25px;
            ">
                <a href="https://www.uxlivinglab.org/" style="
                    text-align: center;
                    color: white;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    text-decoration: none;
                ">
                    DoWell UX Living Lab
                </a>
                <p style="margin-top: 10px; font-size: 12px;">
                    &copy; 2023-All rights reserved.
                </p>
            </footer>
        </div>
    </body>

    </html>
`

    console.log("\nHTML EXTRACTED:\n", template, "\n")
    return template;
}

export const sendEmail = (formData, buttonField, setSideBar) => {
    const { email_content, ...data } = formData;
    const template = getEmailTemplate(email_content)
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://100085.pythonanywhere.com/api/uxlivinglab/email/',
        data: {
            ...data,
            email_content: template
        }
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