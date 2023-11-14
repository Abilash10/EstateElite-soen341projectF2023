from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Run Chrome in headless mode for testing environment
chrome_options = Options()
chrome_options.add_argument("--headless")

# Initialize the WebDriver
driver = webdriver.Chrome(options=chrome_options)

wait = WebDriverWait(driver, 10)

try:
    # Navigate to the homepage
    driver.get("http://localhost:3000/")  # Replace with your sign-up page URL
    logging.info("Navigated to the homepage.")

    # Find and click the Sign Up button
    sign_up_button = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//a[normalize-space()='Login/Register']")
        )
    )
    sign_up_button.click()
    logging.info("Clicked the Sign Up button.")

    # Wait for and click the "Don't have an account?" option
    wait.until(EC.element_to_be_clickable((By.XPATH, "//a[@href='#']"))).click()
    logging.info("Clicked 'Don't have an account?'")

    # Wait and fill in the username and password fields
    username_field = wait.until(EC.presence_of_element_located((By.ID, "username")))
    username_field.send_keys("new_username")
    logging.info("Filled in the username.")

    password_field = wait.until(EC.presence_of_element_located((By.ID, "password")))
    password_field.send_keys("new_password")
    logging.info("Filled in the password.")

    # Wait and click the Sign Up button
    wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    ).click()
    logging.info("Clicked the final Sign Up button.")

    # Validate that the account was successfully created
    success_message = wait.until(
        EC.presence_of_element_located(
            (By.LINK_TEXT, "registration completed! Now login.")
        )
    )
    assert "registration completed! Now login." == success_message.text
    logging.info("Account successfully created.")

except Exception as e:
    logging.error(f"An error occurred: {e}")

finally:
    # Close the WebDriver
    driver.quit()
    logging.info("WebDriver closed.")
