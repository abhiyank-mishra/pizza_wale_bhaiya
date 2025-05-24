import subprocess
from datetime import datetime

# Current date and time in 12-hour format with hour and minute only
now = datetime.now()
formatted_time = now.strftime("%m/%d/%Y %I:%M %p")  # 12-hour format with AM/PM

commit_message = f"Menu Update - {formatted_time}"

def run_git_commands():
    try:
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        subprocess.run(["git", "push"], check=True)
        print("Git push successful with commit message:", commit_message)
    except subprocess.CalledProcessError as e:
        print("An error occurred:", e)

if __name__ == "__main__":
    run_git_commands()
