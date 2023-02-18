export default function validation(id, idlist, opt) {
  let elmnt, destEl, validate;
  if (id == "inf-btn") {
    const info = document.querySelectorAll(".inf-txt");
    //info.splice(1, 1);
    let arrValidEL = [];
    info.forEach((el) => {
      arrValidEL.push(el.validity.valid);
    });
    const valid = arrValidEL.every((b) => b == true);
    valid
      ? (validate = true)
      : alert(`${info[arrValidEL.indexOf(false)].id} not entered!`);
  } else {
    elmnt = document.querySelector(`#${id}-file`);
    destEl = idlist.indexOf(id) + 1;
    if (!elmnt.validity.valid) {
      alert(`${id} is not entered!`);
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
  return validate;
}

function collapse(id) {
  const element = document.querySelector(id);
  const collapse = new bootstrap.Collapse(element, { toggle: false });
  collapse.toggle();
}
