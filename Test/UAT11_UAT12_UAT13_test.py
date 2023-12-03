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
    username_field.send_keys("new_username")
    logging.info("Filled in the username.")

    password_field = wait.until(EC.presence_of_element_located((By.ID, "password")))
    password_field.send_keys("new_password")
    logging.info("Filled in the password.")

    # Click the Login button
    Click_login = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    Click_login.click()
    logging.info("Clicked the submit Login button.")

    # wait 2 seconds
    driver.implicitly_wait(2)

    # click home button
    home_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//a[normalize-space()='Home']"))
    )
    home_button.click()
    logging.info("Clicked the home button.")

    # Search first property
    search_input = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//input[@placeholder='Search by location or address...']")
        )
    )
    search_input.clear()
    search_input.send_keys("test")
    search_input = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[normalize-space()='Search']"))
    )
    search_input.click()
    logging.info("Search first property.")

    # Click make offer button
    make_offer_button = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//button[normalize-space()='Make Offer']")
        )
    )
    make_offer_button.click()

    # input your offer value
    offer_value = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//input[@placeholder='Enter amount...']")
        )
    )
    offer_value.clear()
    offer_value.send_keys(offer_price)
    offer_value.send_keys(Keys.ENTER)
    logging.info("Input your offer value.")

    # Wait for the alert to be present
    WebDriverWait(driver, 10).until(EC.alert_is_present())

    # read and accept the alert
    alert = driver.switch_to.alert
    alert_text = alert.text
    alert.accept()
    logging.info(f"Alert accepted: {alert_text}")

    # lookup the offer
    exit_button = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//span[@class='offerModal_close__zCom-']")
        )
    )
    exit_button.click()

    # click on the offer button
    offer_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//a[normalize-space()='My Offers']"))
    )
    offer_button.click()
    logging.info("looking up offers.")

    # look for an offer object with the offer value and status pending to be displayed
    my_offer = wait.until(
        EC.visibility_of_element_located((By.CLASS_NAME, "myoffers_borderedLi__ueGMA"))
    )

    # lookup for the presence of "pending" and "1000000" in the offer object
    assert "pending" in my_offer.text
    assert offer_price in my_offer.text
    logging.info("Offer value and status pending are displayed.")

    # click the delete button of that object
    delete_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[normalize-space()='Delete']"))
    )
    delete_button.click()
    # Wait for the alert to be present
    WebDriverWait(driver, 10).until(EC.alert_is_present())

    # read and accept the alert
    alert = driver.switch_to.alert
    alert_text = alert.text
    alert.accept()
    logging.info(f"Alert accepted: {alert_text}")

    logging.info("Offer deleted")


except TimeoutException:
    logging.error("A timeout occurred waiting for the search bar to appear.")
    raise
except AssertionError as e:
    logging.error(f"Assertion error: {e}")
    raise
except Exception as e:
    logging.error(f"An error occurred: {e}")
    raise

finally:
    # Close the WebDriver
    driver.quit()
    logging.info("WebDriver closed.")
