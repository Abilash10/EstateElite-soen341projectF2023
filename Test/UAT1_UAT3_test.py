# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re


class Record11142331228Pm(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.blazedemo.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_record11142331228_pm(self):
        driver = self.driver
        # Label: Test
        # ERROR: Caught exception [ERROR: Unsupported command [resizeWindow | 1440,815 | ]]
        driver.get("http://localhost:3000/")
        driver.find_element_by_xpath(
            '//*[contains(text(), "Advanced Filters")]'
        ).click()
        driver.find_element_by_xpath('//*[text() = "Login/Register"]').click()
        driver.find_element_by_xpath('//*[text() = "Login/Register"]').click()
        driver.find_element_by_xpath('//*[text() = "Login/Register"]').click()
        # ERROR: Caught exception [ERROR: Unsupported command [doubleClick | //*[text() = "Login/Register"] | ]]
        driver.find_element_by_xpath('//*[text() = "Login/Register"]').click()
        # ERROR: Caught exception [ERROR: Unsupported command [doubleClick | //*[text() = "Login/Register"] | ]]
        driver.find_element_by_xpath(
            '//input[@id=string(//label[text() = "Username:"])]'
        ).click()
        driver.find_element_by_xpath(
            '//input[@id=string(//label[text() = "Username:"])]'
        ).clear()
        driver.find_element_by_xpath(
            '//input[@id=string(//label[text() = "Username:"])]'
        ).send_keys("popop")
        driver.find_element_by_xpath('//*[contains(text(), "Login")]').click()
        driver.find_element_by_xpath(
            '//input[@id=string(//label[text() = "Password:"])]'
        ).click()
        # ERROR: Caught exception [unknown command [typeSecret]]
        driver.find_element_by_xpath('//*[text() = "Login"]').click()

    def is_element_present(self, how, what):
        try:
            self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e:
            return False
        return True

    def is_alert_present(self):
        try:
            self.driver.switch_to_alert()
        except NoAlertPresentException as e:
            return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
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
