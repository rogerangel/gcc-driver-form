import { compressImage, fileToDataUri, fileObj } from "./compressIMG.js";
import validation from "./Validity.js";
import { enforceFormat, formatToPhone } from "./contactFormat.js";

const url =
  "https://script.google.com/macros/s/AKfycbwEWWQxLLPl4qxowWmuqfN-w4HA_HyR96jQjPbrSjtoA2X7SwYN1gxBt6f1pyYFNH3y/exec";

const formInJson = () => {
  const obj = {
    f_name: document.getElementById("f-name").value,
    m_name: document.getElementById("m-name").value,
    l_name: document.getElementById("l-name").value,
    p_number: document.getElementById("phonenumber").value,
    email: document.getElementById("email").value,
    residence_borough: document.getElementById("borough").value,
  };

  obj.id = btoa(`${obj.l_name}${obj.p_number}${obj.email}`);

  return obj;
};

const list = ["sidl", "tlc", "ss", "fh1", "coli", "vin", "dia", "ins"];

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
      compressImage(id, tmpImg, 0.5, 1);
      const conf = document.querySelector(`#${c}-conf`);
      conf.innerHTML = `<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-check-lg text-success"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                    />
                  </svg>`;
    });

    return false;
  });

  const uploadBtn = document.querySelector(`#${c}-btn`);

  uploadBtn.addEventListener("click", async () => {
    uploadBtn.setAttribute("disabled", "");
    uploadBtn.innerHTML = loaders("loading");
    if (`${c}_img` == fileObj[0]) {
      const infID = formInJson().id;
      const obj = { id: infID, type: "Img", data: {} };
      obj.data[`${fileObj[0]}`] = fileObj[1];
      //          ----------------- EDIT HERE ----------- ADD WAIT ICON ----------------
      await initForm(obj);
      // console.log(obj);
      uploadBtn.removeAttribute("disabled");
      uploadBtn.innerHTML = "Next";
    } else {
      const conf = document.querySelector(`#${c}-conf`);
      conf.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill text-warning" viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>`;
      uploadBtn.removeAttribute("disabled");
      uploadBtn.innerHTML = "Next";
    }
    validation(c, list);
    setTimeout(() => window.scrollBy(0, 150), 400);
  });
});

const info = document.querySelector(`#inf-btn`);

info.addEventListener("click", async (e) => {
  const val = validation(e.target.id, list, "flush-collapseTwo");

  const form = formInJson();

  document.querySelector(
    "#conf-name"
  ).innerHTML = `${form["f_name"]} ${form["m_name"]} ${form["l_name"]}`;
  document.querySelector("#conf-cont").innerHTML = `${form["p_number"]}`;
  document.querySelector("#conf-email").innerHTML = `${form["email"]}`;
  document.querySelector(
    "#conf-place"
  ).innerHTML = `${form["residence_borough"]}`;

  const obj = { type: "Info", data: form };
  if (val) {
    await initForm(obj);
    // console.log(obj);
  }
  console.log(val);
});

const loaders = (stats) => {
  const visualStatus = {
    status: {
      loading: [
        `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`,
        `  Loading... Please Wait!`,
      ].join(""),
    },
  };

  return visualStatus.status[stats];
};

const transmit = document.getElementById("complete-btn");

transmit.addEventListener("click", async () => {
  const obj = { type: "App", id: formInJson().id };
  await initForm(obj);
  // console.log(obj);
});

const initForm = async (json) => {
  try {
    // const data = formInJson();
    // const json = JSON.stringify(data);

    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(json),
    });
    // console.log(json);
  } catch (err) {
    console.dir();
    console.log(err);
  }
};

const inputElement = document.getElementById("phonenumber");
inputElement.addEventListener("keydown", enforceFormat);
inputElement.addEventListener("keyup", formatToPhone);
