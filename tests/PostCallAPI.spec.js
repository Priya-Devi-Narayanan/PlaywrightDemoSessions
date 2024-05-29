
const { test, expect } = require("@playwright/test");
const postRequest = require("../testdata/postcalltestdata.json");

test("Create POST api request using JSON file in playwright", async ({
  request,
}) => {
  // create post api request using playwright
  const postAPIResponse = await request.post("/booking", {
    data: postRequest,
  });

  // validate status code
  console.log(await postAPIResponse.json());

  expect.soft(postAPIResponse.ok()).toBeTruthy();
  expect.soft(postAPIResponse.status()).toBe(200);

  // validate api response json obj
  const postAPIResponseBody = await postAPIResponse.json();

  expect.soft(postAPIResponseBody.booking).toHaveProperty(
    "firstname",
    "testers talk playwright"
  );
  expect.soft(postAPIResponseBody.booking).toHaveProperty(
    "lastname",
    "testers talk api testing"
  );

  // validate api response nested json obj
  expect.soft(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    "2018-01-01"
  );
  expect.soft(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    "2019-01-01"
  );
});
