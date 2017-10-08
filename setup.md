# Setup

Follow these steps to successfully run this app on your machine!

## 1. Requirements

1. [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

    Check that it installed correctly:

      ```sh
      which git
      ```

    If Git is installed, this will return the path `/usr/local/bin/git`  
    If you get an error message, check the Git documentation and   
    try again.
    
    
2. Install Python 3.

    - <b>Any OS: </b>use a downloadable installer for any operating system: https://www.python.org/downloads/

    - <b>macOS</b> using [Homebrew](https://brew.sh/):

        ```sh
        brew install python3
        ```

    - <b>Windows</b> using [Scoop](http://scoop.sh/):

        ```sh
        scoop install python3
        ```

    - Once installed, verify that it's installed correctly:

        ```sh
        which python3
        ```

        If installed, this will return the path `/usr/local/bin/python3`

3. [Install Flask](http://flask.pocoo.org/docs/0.12/installation/)

    Check that it installed correctly:

      ```sh
      flask --version
      ```
      
      If Flask is installed, this will return your version.  
      We are using Flask 0.12.2, so check that your version matches.


## 2. Download the project.

1. [Fork this repository](https://github.com/hendricksonsarahl/voluntr)

2. Clone the git repository to your machine

      ```sh
      git clone git@github.com:YOUR_GITHUB_USERNAME/voluntr.git
      ```

3. Move into that repository

      ```sh
      cd voluntr
      ```

## 3. Set up development environment:

1. Set up a [Python Virtual Environment (venv)](https://docs.python.org/3/library/venv.html):

    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

2. Install dependencies from the Voluntr requirements.txt file

    ```sh
    pip install -r requirements.txt
    ```

3. Setup a local mySQL database using [MAMP](https://www.mamp.info/en/downloads/)

    - Select the download for your OS (MAMP, <b>not</b> MAMP Pro)

    - Create a new user account and database through phpMyAdmin

        ![MAMP new user](./assets/mamp_new_user.jpg)

    - Make sure your username and password are exactly:

		- username: voluntr
		- password: voluntr

## 4. Run the app.

1. Run:

    ```sh
    python voluntr.py
    ```

    The app will now be running in your browser at [http://localhost:8000/](http://localhost:8000/)


---

For problems related to these instructions or bugs in our code, please [open a new issue](https://github.com/hendricksonsarahl/voluntr/issues/new)