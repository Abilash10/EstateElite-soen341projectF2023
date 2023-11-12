from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoAlertPresentException
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Run Chrome in headless mode for testing environment
chrome_options = Options()
chrome_options.add_argument("--headless")

# Initialize the WebDriver
driver = webdriver.chrome(options=chrome_options)

wait = WebDriverWait(driver, 10)

try:
    # Navigate to the homepage
    driver.get("http://localhost:3000/")  # Replace with your sign-up page URL
    logging.info("Navigated to the homepage.")

    # Find and click the 'Login/Register' link
    login_register_link = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//a[normalize-space()='Login/Register']")
        )
    )
    login_register_link.click()
    logging.info("Clicked the 'Login/Register' link.")

    # Wait for and click the "Don't have an account?" option
    Dont_have_a_account = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//a[@href='#']"))
    )
    Dont_have_a_account.click()
    logging.info("Clicked 'Don't have an account?'")

    # Wait and fill in the username and password fields
    username_field = wait.until(EC.presence_of_element_located((By.ID, "username")))
    username_field.send_keys("new_username")
    logging.info("Filled in the username.")
    password_field = wait.until(EC.presence_of_element_located((By.ID, "password")))
    password_field.send_keys("new_password")
    logging.info("Filled in the password.")

    # Submit the registration form
    submit_registration_button = driver.find_element(
        By.XPATH, "//button[@type='submit']"
    )
    submit_registration_button.click()
    logging.info("Registration form submitted.")

    # Wait for the alert to be present
    WebDriverWait(driver, 10).until(EC.alert_is_present())

    # Switch to the alert
    alert = driver.switch_to.alert

    # Validate the alert's text
    assert "registration completed! Now login." in alert.text
    logging.info("Alert shows the expected success message.")

    # You can now accept the alert which is equivalent to clicking 'OK'
    alert.accept()

except NoAlertPresentException as e:
    logging.error(f"No alert present: {e}")
except Exception as e:
    logging.error(f"An error occurred: {e}")

finally:
    # Close the WebDriver
    driver.quit()
    logging.info("WebDriver closed.")
