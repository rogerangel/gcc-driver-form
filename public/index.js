import { compressImage, fileToDataUri, fileObj } from "./compressIMG.js";
import { validation, icon } from "./Validity.js";
import { enforceFormat, formatToPhone } from "./contactFormat.js";
import Gapp from "./controller.js";

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
  obj.host = window.location.hostname;

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
      conf.innerHTML = icon("success");
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
      await Gapp.connect.send(obj);
      // console.log(obj);
      uploadBtn.removeAttribute("disabled");
      uploadBtn.innerHTML = "Next";
    } else {
      const conf = document.querySelector(`#${c}-conf`);
      conf.innerHTML = icon("danger");
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
    try {
      const init = await fetch(url, {
        method: "GET",
        redirect: "follow",
      });
      const json = JSON.parse(await init.text());
      const ar = json[0].data;
      const findAr = ar.some((i) => i["AppID"] == form["id"]);
      if (!findAr) {
        // await Gapp.connect.send(obj);
        console.log(obj);
      } else {
        const card = {
          page: [
            `<div class="card mt-4">`,
            `<div class="card-body">`,
            `<h5 class="card-title">Notice</h5>`,
            `<h6 class="card-subtitle mb-2 text-muted">${icon(
              "danger"
            )} Application in process!</h6>`,
            `<p class="card-text">
              Your application has already been submitted, a hiring manager will be contacting you shortly.
            </p>`,
            `</div>`,
            `<div class="card-footer text-muted">`,
            `<a href="tel:+1 (917) 309-7242" class="card-link link-secondary">Click to call us for any questions!</a>`,
            `<br>`,
            `<a href="mailto:cesar.nunez@gcctransportationllc.org" class="card-link link-secondary">Click to email us!</a>`,
            `</div>`,
            `</div>`,
          ].join(""),
        };
        document.querySelector(`#accordionFlush`).innerHTML = card["page"];
      }
    } catch (error) {
      console.log(error);
      console.dir();
    }
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
  const card = {
    page: [
      `<div class="card mt-4">`,
      `<div class="card-body">`,
      `<h5 class="card-title">Thank You!</h5>`,
      `<h6 class="card-subtitle mb-2 text-muted">${icon(
        "success"
      )} Application Complete</h6>`,
      `<p class="card-text">
      We appriciate your interest in partnering with us at GCC Transportation. 
      We will be contacting you very soon to initiate the next step and start earning right away on the road! 💸
      </p>`,
      `</div>`,
      `<div class="card-footer text-muted">`,
      `<a href="tel:+1 (917) 309-7242" class="card-link link-secondary">Click to call us for any questions!</a>`,
      `<br>`,
      `<a href="mailto:cesar.nunez@gcctransportationllc.org" class="card-link link-secondary">Click to email us!</a>`,
      `</div>`,
      `</div>`,
    ].join(""),
  };
  const obj = { type: "App", id: formInJson().id };
  document.querySelector("#conf-sec").innerHTML = card["page"];
  await Gapp.connect.send(obj);
  // console.log(obj);
});

const initForm = async (json) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

const inputElement = document.getElementById("phonenumber");
inputElement.addEventListener("keydown", enforceFormat);
inputElement.addEventListener("keyup", formatToPhone);
