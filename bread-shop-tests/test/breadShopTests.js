const { expect } = require("chai");
const { before, beforeEach, after } = require("mocha");
const { Builder, By, Select } = require("selenium-webdriver");
const { SandwichPage } = require("../page_models/sandwichPage");

// describe("First suite", function () {
// this.timeout(5000);
// it("First test", function () {

//   let driver = await new Builder().forBrowser('chrome').build();
//   expect(1).to.equal(1);

//   await driver.quit(); // quit driver method
describe("sandwich order", function () {
  this.timeout(5000);
  let driver;
  let sandwichPage;

  before(async function () {
    //setup
    driver = await new Builder().forBrowser("chrome").build();
    //await driver.manage().setTimeouts({ implicit: 1000 });
  });

  beforeEach(async function () {
    await driver.get("http://localhost:4200/order/sandwich");
    sandwichPage = new SandwichPage(driver);
    await sandwichPage.validatePage();
  });

  after(async function () {
    //teardown
    if (driver) {
      await driver.quit();
    }
  });

  describe("bread type selection", function () {
    it("displays the selected value", async function () {
      return new Promise(async (resolve, reject) => {
        try {
          //act
          await sandwichPage.selectRyeBreadOption();
          // assert
          let selectedValue = await sandwichPage.getBreadTypeOverview();
          expect(selectedValue).to.equal("rye bread");

          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
    it("removes the placeholder text", async function () {
      return new Promise(async (resolve, reject) => {
        try {
          //act
          await sandwichPage.selectRyeBreadOption();
          // assert
          let selectedValue = await sandwichPage.getBreadTypeOverview();
          expect(selectedValue).to.equal("rye bread");

          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });

  it("selects the main filling", async function () {
    return new Promise(async (resolve, reject) => {
      try {
        //act
        await sandwichPage.selectHollumiFillingOption();
        // assert
        let selectedValue = await sandwichPage.getMainFillingOverview();
        expect(selectedValue).to.equal("halloumi");

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
  it("updates the total price when the bread type is selected", async function () {
    //act

    expect(await sandwichPage.getTotalPrice()).to.equal("$0");

    await sandwichPage.selectRyeBreadOption();

    //assert
    expect(await sandwichPage.getTotalPrice()).to.equal("$6");
  });
  it("selects the extras added", async function () {
    //act

    await sandwichPage.selectExtraSaladOption();
    await sandwichPage.selectExtraKetchupOption();

    // assert
    let selectedValue = await sandwichPage.getExtraTypeOverview();
    expect(selectedValue).to.equal("salad, ketchup");
  });

  describe("when the network has high latency", function () {
    beforeEach(async function () {
      await driver.setNetworkConditions({
        offline: false,
        latency: 1000,
        download_throughput: 35 * 1024,
        upload_throughput: 50 * 1024,
      });
    });
    afterEach(async function () {
      await driver.deleteNetworkConditions();
    });
    it.only("displays spining wheel when checking promo code", async function () {
      //act
      await sandwichPage.setValidPromoCode();
      await sandwichPage.redeemPromoCode();

      //assert
      expect(await sandwichPage.getSpinner().isDisplayed()).to.be.true;
    });
  });
});
