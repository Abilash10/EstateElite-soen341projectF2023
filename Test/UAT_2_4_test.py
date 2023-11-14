from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Run Chrome in headless mode for the testing environment
chrome_options = Options()
chrome_options.add_argument("--headless")

# Initialize the WebDriver
driver = webdriver.Chrome(options=chrome_options)

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
    username_field.send_keys("existing_username")
    logging.info("Filled in the username.")

    password_field = wait.until(EC.presence_of_element_located((By.ID, "password")))
    password_field.send_keys("existing_password")
    logging.info("Filled in the password.")

    # Click the Login button
    wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    ).click()
    logging.info("Clicked the final Login button.")

    # Check for error message if the username or password is incorrect
    try:
        error_message = wait.until(
            EC.presence_of_element_located((By.XPATH, "//div[@class='error-message']"))
        )
        assert False, f"Error message displayed: {error_message.text}"
    except TimeoutException:
        logging.info("No error message displayed.")

    # Verify the user is on the homepage by checking the search bar's presence
    search_bar = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//input[@placeholder='Search by location or address...']")
        )
    )
    assert search_bar.is_displayed(), "Search bar is not displayed, not on homepage."
    logging.info("User is on the homepage, search bar is displayed.")

except Exception as e:
    logging.error(f"An error occurred: {e}")

finally:
    # Close the WebDriver
    driver.quit()
    logging.info("WebDriver closed.")
