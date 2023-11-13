from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options
from selenium.common.exceptions import NoAlertPresentException
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

# Setup Firefox options
options = Options()
options.headless = True  # Run in headless mode

# Initialize the Firefox driver
driver = webdriver.Firefox(options=options)
wait = WebDriverWait(driver, 10)  # Setup wait variable

try:
    # Navigate to the URL
    driver.get("http://localhost:3000")
    logging.info("Navigated to the homepage")

    # Click the Login button
    login_button = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//a[normalize-space()='Login/Register']")
        )
    )
    login_button.click()
    logging.info("Clicked the Login button")

    # Wait and fill in the username and password
    username_field = wait.until(EC.presence_of_element_located((By.ID, "username")))
    username_field.send_keys("new_username")
    logging.info("Filled in the username")

    password_field = wait.until(EC.presence_of_element_located((By.ID, "password")))
    password_field.send_keys("new_password")
    logging.info("Filled in the password")

    # Click the final Login button
    login_submit_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    login_submit_button.click()
    logging.info("Clicked the final Login button")

    # Search first property
    search_input = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//input[@placeholder='Search by location or address...']")
        )
    )
    search_input.clear()
    search_input.send_keys("cool")
    logging.info("Search criteria entered")

    # Click the search button
    search_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[normalize-space()='Search']"))
    )
    search_button.click()
    logging.info("Clicked Search")

    # Wait for the listings to be visible
    listings = wait.until(
        EC.visibility_of_all_elements_located(
            (By.CLASS_NAME, "searchedProperties_propertyCard__bIMx-")
        )
    )
    logging.info("Listings are visible now")

    # Assuming you only want to click 'Request Visit' for the first listing that matches
    first_listing = listings[0]
    listing_id = first_listing.get_attribute("id")
    logging.info(f"Listing found: {listing_id}")

    # Click on 'Request visit' for the first listing
    request_visit_button = wait.until(
        EC.element_to_be_clickable(
            (
                By.XPATH,
                f"//div[@id='{listing_id}']//button[contains(text(),'Request Visit')]",
            )
        )
    )
    request_visit_button.click()
    logging.info(f"Clicked 'Request Visit' for listing {listing_id}")

    # Wait for the alert to be present
    WebDriverWait(driver, 10).until(EC.alert_is_present())
    logging.info("Alert is present")

    # Switch to the alert
    alert = driver.switch_to.alert

    # Validate the alert's text
    if "Visit Requested!" in alert.text:
        logging.info(f"Visit request sent for listing {listing_id}")
    else:
        logging.error(f"Alert text did not match for listing {listing_id}")

    # Accept the alert
    alert.accept()
    logging.info("Alert accepted")

except NoAlertPresentException as e:
    logging.error(f"No visit alert present: {e}")
    raise
except Exception as e:
    logging.error(f"An error occurred: {e}")
    raise
finally:
    # Close the browser
    driver.quit()
    logging.info("Browser closed")
