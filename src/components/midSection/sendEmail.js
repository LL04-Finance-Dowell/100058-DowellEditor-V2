import React from "react";
import axios from "axios";
import { downloadPDF, generatePDF } from "../../utils/genratePDF";
import { toast } from "react-toastify";
import { pdf } from "@react-pdf/renderer";
import ReactDOMServer from "react-dom/server";
import { takeScreenShot } from "../../utils/takeScreenShot";
import ShareDocModal from "../modals/ShareDocModal.jsx";

var interval;
const animateDots = (loadingDotsElement, dotCount, cancel = false) => {
  if (cancel) {
    clearInterval(interval);
    loadingDotsElement.innerHTML = "Configure Mail";
  } else {
    loadingDotsElement.innerHTML = "sending";
    let count = 0;
    interval = setInterval(() => {
      loadingDotsElement.innerHTML += ".";
      count++;
      if (count === dotCount) {
        count = 0;
        loadingDotsElement.innerHTML = "sending";
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
                &copy; 2024-All rights reserved.
                </p>
            </footer>
        </div>
    </body>
    </html>
  `;
  return htmlTemplate;
};

const sendScreenShotToAPI = async () => {
  const apiEndpoint =
    "https://dowellfileuploader.uxlivinglab.online/uploadfiles/upload-image-to-drive/";

  const formData = await takeScreenShot();
  return fetch(apiEndpoint, {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return response.json(); // or response.text() depending on the API response format
  });
};

const generateShareHTML = async (link) => {
  const imgUrl = await sendScreenShotToAPI();
  console.log(imgUrl);
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
                   
        
                    <main style="padding: 20px; display: grid; place-items: center">
                        <section style="margin: 20px; display: grid; text-align: center;font-size:1.2rem">
                      
                        <img
                        src="${imgUrl.file_url}"
                        style="display: block; margin: 0 auto"
                        height="100%"
                        width="100%"
                        alt="Document picture"
                        />
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
          `;
  return htmlTemplate;
};

console.log(generateShareHTML);

const getEmailPayLoadd = (token) => {
  const emailTemplate = generateShareHTML(
    `https://ll04-finance-dowell.github.io/100058-DowellEditor-V2/?token=${token}`
  );
  return emailTemplate;
};
console.log(getEmailPayLoadd);

const getEmailPayLoad = async (midsectionNode) => {
  if (midsectionNode) {
    const id = midsectionNode.details._id;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://100058.pythonanywhere.com/api/generate-pdf-link/",
      data: {
        item_id: id,
        item_type: midsectionNode.details.action,
      },
    };

    try {
      const pdfURL = await axios.request(config);
      const emailTemplate = generateHTML(pdfURL.data);
      return emailTemplate;
    } catch (error) {
      console.log(error);
      toast.error("Error generating pdf");
      return null;
    }
  } else {
    toast.error("[PDF-GENERATION]:NO TOKEN PROVIDED");
    return null;
  }
};
console.log(getEmailPayLoad);

export const shareToEmail = async (shareInfo, token) => {
  const htmlTemplate = await getEmailPayLoadd(token);
  console.log(htmlTemplate);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://100085.pythonanywhere.com/api/uxlivinglab/email/",
    data: {
      ...shareInfo,
      email_content: htmlTemplate,
    },
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      toast.success("email sent successfully");
    })
    .catch((error) => {
      console.log(error);
      toast.error("email not sent");
    });
};

console.log(shareToEmail);

export const sendEmail = async (formData, buttonField, setSideBar) => {
  animateDots(buttonField, 4);
  const { email_content, ...data } = formData;
  const htmlTemplate = await getEmailPayLoad(email_content);
  if (!htmlTemplate) {
    toast.error("error generating html");
    return;
  }
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://100085.pythonanywhere.com/api/uxlivinglab/email/",
    data: {
      ...data,
      email_content: htmlTemplate,
    },
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      animateDots(buttonField, 6, true);
      toast.success("email sent successfully");
      setSideBar(false);
    })
    .catch((error) => {
      console.log(error);
      toast.error("email not sent");
      animateDots(buttonField, 7, true);
    });
};

console.log(sendEmail);
