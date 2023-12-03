from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import logging
from selenium.webdriver.firefox.options import Options

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Run in headless mode for testing environment
options = Options()
options.add_argument("--headless")

# Initialize the WebDriver
driver = webdriver.Firefox(options=options)
wait = WebDriverWait(driver, 10)

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
    logging.info("Clicked the Login button.")

    # Wait and fill in the username and password
    username_field = wait.until(EC.presence_of_element_located((By.ID, "username")))
    username_field.send_keys("new_username")
    logging.info("Filled in the username.")

    password_field = wait.until(EC.presence_of_element_located((By.ID, "password")))
    password_field.send_keys("new_password")
    logging.info("Filled in the password.")

    # Click the Login button
    login_submit_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    login_submit_button.click()
    logging.info("Clicked the final Login button.")

    # Validate that the header is visible
    header = wait.until(
        EC.visibility_of_element_located((By.CLASS_NAME, "header_menu__5hehJ"))
    )
    logging.info("Header is visible")

    # Validate the presence of the search bar with placeholder text
    search_bar = wait.until(
        EC.presence_of_element_located(
            (By.CSS_SELECTOR, "input[placeholder='Search by location or address...']")
        )
    )
    if search_bar.get_attribute("placeholder") != "Search by location or address...":
        logging.error("Search bar was not found.")
    else:
        logging.info("Search bar is present.")

    # Click on the Profile menu item
    profile_menu_item = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//a[normalize-space()='Profile']"))
    )
    profile_menu_item.click()
    logging.info("Clicked on the Profile menu item.")

    # Ensure the Profile header is present
    profile_header = wait.until(
        EC.visibility_of_element_located(
            (By.XPATH, "//h1[normalize-space()='Profile']")
        )
    )
    logging.info("Profile header is present.")

    # Validate the username display
    username_display = wait.until(
        EC.visibility_of_element_located(
            (By.XPATH, "//h3[normalize-space()='Username: new_username']")
        )
    )
    if "new_username" in username_display.text:
        logging.info("Username display validation passed.")
    else:
        logging.error("Username display validation failed.")

except NoSuchElementException as e:
    logging.error(f"Element not found: {e}")
    raise
except TimeoutException as e:
    logging.error(f"Page load timed out: {e}")
    raise
finally:
    # Close the browser
    driver.quit()
