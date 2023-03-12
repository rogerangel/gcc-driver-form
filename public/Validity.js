export function validation(id, idlist, opt) {
  let elmnt, destEl, validate;
  // const conf = document.querySelector(`#${c}-conf`);
  if (id == "inf-btn") {
    const info = document.querySelectorAll(".inf-txt");
    //info.splice(1, 1);
    let arrValidEL = [];
    info.forEach((el) => {
      arrValidEL.push(el.validity.valid);
    });
    const valid = arrValidEL.every((b) => b == true);
    if (valid) {
      validate = true;
    } else {
      validate = false;
      const idName = info[arrValidEL.indexOf(false)].id;
      alertMsg(idName, `Your ${fields(idName)} is missing!`, "danger", false);
    }
  } else {
    elmnt = document.querySelector(`#${id}-file`);
    destEl = idlist.indexOf(id) + 1;
    if (!elmnt.validity.valid) {
      alertMsg(
        `${id}-file`,
        `Please upload your ${fields(id)}!`,
        "danger",
        false
      );
    }
    validate = elmnt.validity.valid;
  }

  if (validate) {
    if (id == "inf-btn") {
      collapse(`#${opt}`);
      collapse(`#flush-collapse-${idlist[0]}`);
    } else if (idlist[destEl] == "fh1") {
      collapse("#flush-collapseThree");
      collapse(`#flush-collapse-${idlist[destEl]}`);
    } else if (id == "ins") {
      collapse("#conf-sec");
      document.querySelector("#accordionFlush").style.display = "none";
    } else {
      collapse(`#flush-collapse-${idlist[destEl]}`);
    }
  } else {
    console.log("no file uploaded!");
  }
  // icon(validate);
  return validate;
}

function collapse(id) {
  const element = document.querySelector(id);
  const collapse = new bootstrap.Collapse(element, { toggle: false });
  collapse.toggle();
}

export const icon = (r) => {
  const iconObj = {
    success: `<svg
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
                  </svg>`,
    danger: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill text-warning" viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>`,
  };

  return iconObj[r];
};

function fields(id) {
  const fieldName = {
    "f-name": "First Name",
    "m-name": "Middle Name",
    "l-name": "Last Name",
    phonenumber: "Contact Number",
    email: "Email",
    borough: "City",
    sidl: "Drivers License",
    tlc: "TLC License",
    ss: "Social Security",
    fh1: "Insurance FH1",
    coli: "Certificate of Liability",
    vin: "Vehicle Registration",
    dia: "TLC Vehicle License",
    ins: "Vehicle Insurance",
  };
  return fieldName[id];
}

function alertMsg(id, msg, type) {
  const getId = document.querySelector(`#${id}`);
  const elementField = getId.parentNode;
  // const icon = icon(true);

  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible pt-2" role="alert">`,
    `   <div>${icon(type)} ${msg}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  elementField.append(wrapper);
}
