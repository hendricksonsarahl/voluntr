import { showSignUpForm, redirectToOrgHome, onSignIn, signOut } from "../../../src/js/org/auth.js";

describe("showSignUpForm", () => {
  let addressInput;
  const setUpDOM = () => {
    document.body.innerHTML = `
      <div class="center g-signin2" data-onsuccess="onSignIn" data-theme="dark" data-longtitle="true" data-height="50" data-width="300"></div>
      <div class="row signup-row hidden">
        <form action="/org/signup" method="post" id="signup-form">
          <input class="form-control" id="orgName" name="orgName" type="text" maxlength="120" required="required">
          <input class="form-control" id="url" name="url" type="text" maxlength="200" required="required">
          <input class="form-control" id="contactName" name="contactName" type="text" maxlength="120" required="required">
          <input class="form-control" id="email" name="email" type="text" maxlength="200" required="required">
          <input type="hidden" id="token" name="token">
        </form>
      </div>
    `;

    addressInput = document.getElementById("address");
  };

  beforeEach(setUpDOM);

  it("Rendered body HTML matches snapshot", () => {
    showSignUpForm("testName", "testEmail", "testToken");

    const renderedHTML = document.body.innerHTML;
    expect(renderedHTML).toMatchSnapshot();
  });
});

describe("redirectToOrgHome", () => {
  const setUpDOM = () => {
    document.body.innerHTML = `
      <div class="center g-signin2" data-onsuccess="onSignIn" data-theme="dark" data-longtitle="true" data-height="50" data-width="300"></div>
      <div class="row redirect-row hidden"></div>
    `;
  };

  beforeEach(setUpDOM);

  it("Rendered body HTML matches snapshot", () => {
    redirectToOrgHome();

    const renderedHTML = document.body.innerHTML;
    expect(renderedHTML).toMatchSnapshot();
  });
});
