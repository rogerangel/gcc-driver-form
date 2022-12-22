import { compressImage, fileToDataUri, fileObj } from "./compressIMG.js";

const transmit = document.getElementById("complete-btn");

const url =
  "https://script.google.com/macros/s/AKfycbx_JctefKSxTl4t8lhTaItk9YXFD0Wc_CH26pbfdf01DozgE3mxotoc1cEW09i2B_Oimg/exec";

const formInJson = () => {
  const obj = {
    f_name: document.getElementById("f-name").value,
    m_name: document.getElementById("m-name").value,
    l_name: document.getElementById("l-name").value,
    p_number: document.getElementById("phonenumber").value,
    email: document.getElementById("email").value,
    residence_borough: document.getElementById("borough").value,
    ...fileObj,
  };

  return obj;
};

const list = ["sidl", "tlc", "ss", "fh1", "coli", "vin", "ins"];

list.forEach((c) => {
  const fileInput = document.querySelector(`input.${c}`);
  const elClassList = Object.values(fileInput.classList);
  const elClIx = elClassList.indexOf(c);

  fileInput.addEventListener("change", async (e) => {
    const tmpImg = new Image();
    const [file] = fileInput.files;
    // storing the original image
    tmpImg.src = await fileToDataUri(file);

    // compressing the uplodaded image
    tmpImg.addEventListener("load", () => {
      const id = {
        input_name: e.target.classList[elClIx],
        placeholder_id: `img.${e.target.classList[elClIx]}`,
      };
      compressImage(id, tmpImg, 0.1, 1);
    });

    return false;
  });
});

const initForm = () => {
  try {
    const data = formInJson();
    const json = JSON.stringify(data);

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: json,
    });

    alert(
      "Application has been submitted! We will contact you soon. Thank you!"
    );
    location.reload();
    console.log(json);
  } catch (err) {
    console.dir();
    console.log(err);
  }
};

transmit.addEventListener("click", initForm);
