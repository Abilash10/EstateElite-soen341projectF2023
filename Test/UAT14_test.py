from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.firefox.options import Options
import logging
from selenium.webdriver.common.keys import Keys

# from selenium.webdriver.chrome.options import Options

offer_price = "1000000"

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Run in headless mode for testing environment
options = Options()
options.add_argument("--headless")

# Initialize the WebDriver
driver = webdriver.Firefox(options=options)
wait = WebDriverWait(driver, 10)

try:
    # Navigate to the homepage
    driver.get("http://localhost:3002/")
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
    username_field.send_keys("peno")
    logging.info("Filled in the username.")

    password_field = wait.until(EC.presence_of_element_located((By.ID, "password")))
    password_field.send_keys("peno")
    logging.info("Filled in the password.")

    # Click the Login button
    Click_login = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    Click_login.click()
    logging.info("Clicked the submit Login button.")

    # wait 2 seconds
    driver.implicitly_wait(2)

    # click offers button
    offers_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//a[normalize-space()='Offers']"))
    )
    offers_button.click()
    logging.info("Clicked the offers button.")

    # look for presence of button Accept
    accept_button = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//button[normalize-space()='Accept']")
        )
    )
    # look for presence of button rejected
    rejected_button = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//button[normalize-space()='Rejected']")
        )
    )
    logging.info(f"{accept_button.text} and {rejected_button.text} button found.")


finally:
    # Close the WebDriver
    driver.quit()
    logging.info("WebDriver closed.")
