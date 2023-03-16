import {icon} from "./Validity.js";

const card = (title, {subtitle, style}, body, footer) => {
    const page = [
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
}