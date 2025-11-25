
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base# Import Base from models.py

# --- 1. Database Configuration ---
# We use a simple SQLite database file for this example.
# In production (FastAPI), you would replace this with something like PostgreSQL or MySQL URL.
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

# --- 2. Create the SQLAlchemy Engine ---
# The Engine is the starting point for all SQLAlchemy applications.
# 'connect_args' is required for SQLite to allow multiple threads to access the database.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# --- 3. Create SessionLocal Factory ---
# SessionLocal is the factory we will use to get new Database Sessions.
# autocommit=False means we explicitly call db.commit() to save changes.
# autoflush=False means we don't automatically flush (send changes to the DB for staging)
# until we explicitly tell it to.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# --- 4. Database Initialization ---
# This command tells SQLAlchemy to create all tables defined in Base (our Profile model)
# in the database file if they don't already exist.
Base.metadata.create_all(bind=engine)


# --- 5. Dependency Function for FastAPI (The most important part) ---

def get_db():
    """
    Dependency function that provides a database session to a FastAPI route.
    It ensures the session is always closed after the request is finished, 
    even if errors occur, preventing resource leaks.
    """
    db = SessionLocal()
    try:
        # 'yield' makes this a context manager that provides the session
        yield db 
    finally:
        # This code block always runs when the request is done.
        db.close()