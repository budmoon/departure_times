from flask_script import Manager
from flask_assets import ManageAssets
from app import app

manager = Manager(app)
manager.add_command("assets", ManageAssets())

if __name__ == "__main__":
    manager.run()
