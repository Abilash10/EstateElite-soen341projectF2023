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

    Click_Broker = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//a[normalize-space()='Broker List']"))
    )
    Click_Broker.click()
    logging.info("Clicked on broker page")

    # Search broker
    search_input = wait.until(
        EC.element_to_be_clickable(
            (
                By.XPATH,
                "/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/input[1]",
            )  # might cause a bug later on!Abs xpath!
        )
    )
    search_input.clear()
    search_input.send_keys("peno")
    logging.info("Search criteria entered")

    # Click the search button
    search_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    search_button.click()
    logging.info("Clicked Search")

    # Wait for the Broker to be visible
    Brokers = wait.until(
        EC.visibility_of_all_elements_located(
            (By.CLASS_NAME, "searchedProperties_propertyCard__bIMx-")
        )
    )
    logging.info("Brokers are visible now")

    # Display broker properly
    first_Broker = Brokers[0]
    Broker_id = first_Broker.get_attribute("id")

    if Broker_id:
        logging.info(f"Broker found: {Broker_id}")
    else:
        logging.error(f"Broker was not found")


except Exception as e:
    logging.error(f"An error occurred: {e}")
    raise
finally:
    # Close the browser
    driver.quit()
    logging.info("Browser closed")