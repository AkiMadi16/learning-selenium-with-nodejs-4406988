const { By, Select } = require("selenium-webdriver");

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
    return this.driver.findElement(By.className("total-price")).getText();
  }

  selectRyeBreadOption() {
    return this.driver.findElement(By.id("bread-type-rye")).click();
  }

  getBreadTypeOverview() {
    return this.driver.findElement(By.className("bread-type-value")).getText();
  }

  selectExtraOption() {
    return this.driver.findElement(By.id("extra-option-0")).click();
  }

  getExtraTypeOverview() {
    return this.driver
      .findElement(By.className("extra-filling-value"))
      .getText();
  }
}

module.exports = { SandwichPage };
