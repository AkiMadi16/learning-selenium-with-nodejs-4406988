const { By, Select, until } = require("selenium-webdriver");

class SandwichPage {
  constructor(driver) {
    this.driver = driver;
  }
  async validatePage() {
    // validate if we are in the right page
    let title = await this.driver.getTitle();
    if (title != "Order a Sandwich | BreadShop") {
      throw Error("You are on the wrong page.");
    }
  }

  selectRyeBreadOption() {
    return this.driver.findElement(By.id("bread-type-rye")).click();
  }

  getBreadTypeOverview() {
    return this.driver.findElement(By.className("bread-type-value")).getText();
  }

  async selectHollumiFillingOption() {
    let mainFillingElement = await this.driver.findElement(
      By.id("form-select-main-filling")
    );
    let select = new Select(mainFillingElement);
    await select.selectByValue("halloumi");
  }

  getMainFillingOverview() {
    return this.driver
      .findElement(By.className("main-filling-value"))
      .getText();
  }

  getTotalPrice() {
    return this.driver
      .wait(
        until.elementLocated(By.className("total-price")),
        1000,
        "Total price was not located",
        6
      )
      .getText();
  }

  selectRyeBreadOption() {
    return this.driver.findElement(By.id("bread-type-rye")).click();
  }

  getBreadTypeOverview() {
    return this.driver.findElement(By.className("bread-type-value")).getText();
  }

  selectExtraSaladOption() {
    return this.driver.findElement(By.id("extra-option-0")).click();
  }

  // selectExtraSaladFilling() {
  //   return this.driver.findElement(By.css('[value=salad]')).click();
  // }
  // selectExtraKetchupFilling() {
  //   return this.driver.findElement(By.css('[value=ketchup]')).click();
  // }

  selectExtraKetchupOption() {
    return this.driver.findElement(By.id("extra-option-3")).click();
  }

  getExtraTypeOverview() {
    return this.driver
      .findElement(By.className("extra-filling-value"))
      .getText();
  }

  getBreadTypePlaceholders() {
    return this.driver.findElements(By.className("bread-type-placeholders"));
  }

  setValidPromoCode() {
    return this.driver
      .findElement(By.className("form-input-promo-code"))
      .sendKeys("SPRING");
  }

  redeemPromoCode() {
    return this.driver.findElement(By.className("redeem-promo-code"));
  }

  getSpinner() {
    return this.driver.findElement(
      By.css(".redeem-promo-code .spinner-border")
    );
  }
}

module.exports = { SandwichPage };
