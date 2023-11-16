# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re
import logging
from selenium.webdriver.firefox.options import Options as FirefoxOptions


class TestTry(unittest.TestCase):
    def setUp(self):
        options = FirefoxOptions()
        # Add any Firefox options if necessary, e.g., running headless
        # options.headless = True

        self.driver = webdriver.Firefox(options=options)
        self.driver.implicitly_wait(10)
        self.base_url = "https://www.blazedemo.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_try(self):
        driver = self.driver
        wait = WebDriverWait(driver, 30)
        driver.get("http://localhost:3000/")

        search_input = wait.until(
            EC.presence_of_element_located(
                (By.XPATH, '//input[@placeholder = "Search by location or address..."]')
            )
        )
        search_input.click()
        search_input.clear()
        search_input.send_keys("cool")
        driver.find_element(By.XPATH, '//*[text() = "Search"]').click()

        listings = wait.until(
            EC.visibility_of_all_elements_located(
                (By.CLASS_NAME, "searchedProperties_propertyCard__bIMx-")
            )
        )
        first_listing = listings[0]
        logging.info(f"Listing found: {first_listing.text}")

    def is_element_present(self, how, what):
        try:
            self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e:
            return False
        return True

    def is_alert_present(self):
        try:
            self.driver.switch_to.alert
        except NoAlertPresentException as e:
            return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to.alert
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally:
            self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)


if __name__ == "__main__":
    unittest.main()
