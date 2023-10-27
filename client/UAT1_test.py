from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

# for it to run on the testing environement I need it to be headless
chrome_options = Options()
chrome_options.add_argument("--headless")

# Initialize the WebDriver
driver = webdriver.Chrome(options=chrome_options)

wait = WebDriverWait(driver, 10)

# Navigate to the page where the sign-up process starts
driver.get("http://localhost:3000/")  # Replace this with the URL of your sign-up page

# Wait and find the Sign Up button, then click it
wait = WebDriverWait(driver, 10)  # Wait up to 10 seconds
sign_up_button = wait.until(
    EC.presence_of_element_located(
        (By.XPATH, "//a[normalize-space()='Login/Register']")
    )
)
sign_up_button.click()

# Wait for the "Don't have an account?" option to be clickable
wait.until(EC.element_to_be_clickable((By.XPATH, "//a[@href='#']"))).click()

# Wait and fill in the username and password
username_field = wait.until(EC.presence_of_element_located((By.ID, "username")))
username_field.send_keys("new_username")

password_field = wait.until(EC.presence_of_element_located((By.ID, "password")))
password_field.send_keys("new_password")

# Wait for the Sign Up button to be clickable and click it
wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))).click()

# Check for the error message if the username already exists
try:
    error_message = wait.until(
        EC.presence_of_element_located(
            (By.LINK_TEXT, "registration completed! Now login.")
        )
    )
    print("Error message displayed:", error_message.text)
except:
    print("No error message displayed.")


# Close the WebDriver
driver.quit()
