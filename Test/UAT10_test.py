from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoAlertPresentException
from selenium.webdriver.firefox.options import Options
import logging

# from selenium.webdriver.chrome.options import Options

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
    username_field.send_keys("peno")
    logging.info("Filled in the Broker's username.")

    password_field = wait.until(EC.presence_of_element_located((By.ID, "password")))
    password_field.send_keys("peno")
    logging.info("Filled in the Broker's password.")

    # Click the Login button
    Click_login = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    Click_login.click()
    logging.info("Clicked the final Login button.")

    # Click the profile button
    Click_profile = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//a[normalize-space()='Profile']"))
    )
    Click_profile.click()
    logging.info("Clicked the profile button.")

    # Click the edit button
    Click_edit = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//button[normalize-space()='Edit Account']")
        )
    )
    Click_edit.click()
    logging.info("Clicked the edit button.")

    # wait and fill the info form
    surname_field = wait.until(
        EC.presence_of_element_located((By.XPATH, "//input[@id='surname']"))
    )
    surname_field.clear()
    surname_field.send_keys("Tester_broker_surname")
    logging.info("Filled in the surname.")

    name_field = wait.until(
        EC.presence_of_element_located((By.XPATH, "//input[@id='name']"))
    )
    name_field.clear()
    name_field.send_keys("Tester_broker_name")
    logging.info("Filled in the name.")

    email_field = wait.until(
        EC.presence_of_element_located((By.XPATH, "//input[@id='email']"))
    )
    email_field.clear()
    email_field.send_keys("test@concorfdia.com")
    logging.info("Filled in the email.")

    Phone_field = wait.until(
        EC.presence_of_element_located((By.XPATH, "//input[@id='phoneNumber']"))
    )
    Phone_field.clear()
    Phone_field.send_keys("123 456 7890")
    logging.info("Filled in the phone number.")

    Company_field = wait.until(
        EC.presence_of_element_located((By.XPATH, "//input[@id='companyName']"))
    )
    Company_field.clear()
    Company_field.send_keys("Tester_company")
    logging.info("Filled in the company name.")

    Office_Address_field = wait.until(
        EC.presence_of_element_located((By.XPATH, "//input[@id='officeAddress']"))
    )
    Office_Address_field.clear()
    Office_Address_field.send_keys("H7")
    logging.info("Filled in the office address.")

    YOE_field = wait.until(
        EC.presence_of_element_located((By.XPATH, "//input[@id='yearsOfExperience']"))
    )
    YOE_field.clear()
    YOE_field.send_keys("6")
    logging.info("Filled in the years of experience.")

    # Click the submit button
    Submit = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    Submit.click()
    logging.info("Clicked the submit button.")

    # Wait for the alert to be present
    WebDriverWait(driver, 10).until(EC.alert_is_present())

    # read and accept the alert
    alert = driver.switch_to.alert
    alert_text = alert.text
    alert.accept()
    logging.info(f"Alert accepted: {alert_text}")

except NoAlertPresentException:
    logging.error(
        "No alert was present when one was expected after modification attempt."
    )
    raise
except TimeoutException:
    logging.error("A timeout occurred waiting for the alert to appear.")
    raise
except Exception as e:
    logging.error(f"An error occurred: {e}")
    raise

finally:
    # Close the WebDriver
    driver.quit()
    logging.info("WebDriver closed.")
