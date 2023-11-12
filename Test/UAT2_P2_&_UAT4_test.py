from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Run Chrome in headless mode for the testing environment
# chrome_options = Options()
# chrome_options.add_argument("--headless")

# Initialize the WebDriver
driver = webdriver.Firefox()  # Chrome(options=chrome_options)

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
    logging.info("Clicked the final Login button.")

    # Validate the presence of the search bar with the expected placeholder
    search_bar = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//input[@placeholder='Search by location or address...']")
        )
    )
    assert search_bar, "Search bar with the correct placeholder is not found."
    logging.info("Search bar with the correct placeholder is found.")

except TimeoutException:
    logging.error("A timeout occurred waiting for the search bar to appear.")
except AssertionError as e:
    logging.error(f"Assertion error: {e}")
except Exception as e:
    logging.error(f"An error occurred: {e}")

finally:
    # Close the WebDriver
    driver.quit()
    logging.info("WebDriver closed.")
