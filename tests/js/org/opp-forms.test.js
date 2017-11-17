import { toggleFlexible } from "../../../src/js/org/opp-forms.js";

let addressInput;
const setUpDOM = () => {
  document.body.innerHTML = `
    <div class="row">
      <div class="col-xs-12 col-sm-4">
        <label for="date">
          <h3>Flexible Schedule?</h3>
        </label>
      </div>
      <div class="col-xs-12 col-sm-8">
        <div class="checkbox checkbox-opp-form">
          <label>
            <input id="flexible" name="flexible" type="checkbox" value="on">
            Yes, please display "Flexible schedule" for this post instead of a specific date and time.
          </label>
        </div>
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col-xs-12 col-sm-4">
        <label for="date" class="schedule-label">
          <h3>Date</h3>
        </label>
      </div>
      <div class="col-xs-12 col-sm-8">
        <input class="form-control schedule-input" id="date" name="date" type="date" required>
      </div>
    </div>
    <br />
    <br class="hidden-xs" />

    <div class="row">
      <div class="col-xs-12 col-sm-4">
        <label for="startTime" class="schedule-label">
          <h3>Start Time</h3>
        </label>
      </div>
      <div class="col-xs-12 col-sm-8">
        <input class="form-control schedule-input" id="startTime" type="time" name="startTime" value="12:00" required>
      </div>
    </div>
    <br />
    <br class="hidden-xs" />

    <div class="row">
      <div class="col-xs-12 col-sm-4">
        <label for="endTime" class="schedule-label">
          <h3>End Time</h3>
        </label>
      </div>
      <div class="col-xs-12 col-sm-8">
        <input class="form-control schedule-input" id="endTime" type="time" name="endTime" value="12:30" required>
      </div>
    </div>
    <br />
    <br class="hidden-xs" />

    <div class="row">
      <div class="col-xs-12 col-sm-4">
        <label for="address">
          <h3>Street Address</h3>
        </label>
      </div>
      <div class="col-xs-12 col-sm-8">
        <input class="form-control" id="address" type="text" name="address" maxlength="120" required>
      </div>
    </div>
    <br />
    <br class="hidden-xs" />
  `;

  addressInput = document.getElementById("address");
};

beforeEach(setUpDOM);

describe("toggleFlexible", () => {
  it("Rendered body HTML matches snapshot for e.target.checked=true", () => {
    const clickEvent = { target: { checked: true } };
    toggleFlexible(clickEvent);

    const renderedHTML = document.body.innerHTML;
    expect(renderedHTML).toMatchSnapshot();
  });

  it("Address input has focus when e.target.checked=true", () => {
    const clickEvent = { target: { checked: true } };
    toggleFlexible(clickEvent);

    expect(document.activeElement).toEqual(addressInput);
  });

  it("Rendered body HTML matches snapshot for e.target.checked=false", () => {
    const clickEvent = { target: { checked: false } };
    toggleFlexible(clickEvent);

    const renderedHTML = document.body.innerHTML;
    expect(renderedHTML).toMatchSnapshot();
  });

  // it("Rendered button HTML matches snapshot for 'false' argument", () => {
  //   updateSaveButton.bind(saveButton, false)();
  //   const renderedHTML = saveButton.outerHTML;
  //   expect(renderedHTML).toMatchSnapshot();
  // });
});
