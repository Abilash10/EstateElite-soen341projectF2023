from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoAlertPresentException
from selenium.webdriver.firefox.options import Options
import logging
import os

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Run Firefox in headless mode for testing environment
options = Options()
options.headless = True
firefox_path = os.getenv("FIREFOX_PATH")
if firefox_path:
    options.binary_location = firefox_path
# Initialize WebDriver
driver = webdriver.Firefox(options=options)

wait = WebDriverWait(driver, 10)

try:
    # Navigate to the homepage
    driver.get("http://localhost:3000/")
    logging.info("Navigated to the homepage.")

    # Click the Login button
    login_button = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//a[normalize-space()='Login/Register']")
        )
    )
    login_button.click()
    logging.info("Clicked the Login button.")

    # Wait and fill in the username and password
    username_field = wait.until(EC.presence_of_element_located((By.ID, "username")))
    username_field.send_keys("non_existing_username")
    logging.info("Filled in the username.")

    password_field = wait.until(EC.presence_of_element_located((By.ID, "password")))
    password_field.send_keys("non_existing_password")
    logging.info("Filled in the password.")

    # Click the Login button
    Click_login = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    Click_login.click()
    logging.info("Clicked the final Login button.")

    # Wait for the alert to be present
    WebDriverWait(driver, 10).until(EC.alert_is_present())

    # Switch to the alert
    alert = driver.switch_to.alert

    # Validate the alert's text
    assert "Username does not exist!" in alert.text
    logging.info("Alert with the correct text found.")

    # Accept the alert
    alert.accept()

# case scenarion for debugging
except NoAlertPresentException:
    logging.error("No alert was present when one was expected after login attempt.")
    raise
except TimeoutException:
    logging.error("A timeout occurred waiting for the alert to appear.")
    raise
except AssertionError as e:
    logging.error(f"The alert text was incorrect: {e}")
    raise
except Exception as e:
    logging.error(f"An error occurred: {e}")
    raise

finally:
    # Close the WebDriver
    driver.quit()
    logging.info("WebDriver closed.")
