from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options
import logging


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
    search_input.send_keys("Tester")
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
        logging.info(f"First broker found: {Broker_id}")
        logging.info(f"\n{first_Broker.text}")
    else:
        logging.error(f"Broker was not found")


except Exception as e:
    logging.error(f"An error occurred: {e}")
    raise
finally:
    # Close the browser
    driver.quit()
    logging.info("Browser closed")
