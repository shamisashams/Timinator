from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime


# The Base class links the Python model to the database engine.
Base = declarative_base()

class Profile(Base):
    """
    SQLAlchemy model representing the 'profiles' table in the database.
    This structure ensures persistent storage for user profile information.
    """
    # 1. Table Name: How the table will be named in the database
    __tablename__ = "profiles"

    # 2. Columns Definition: Maps attributes to database columns

    # Primary Key (Mandatory unique identifier for each profile)
    # We will assume a unique user ID (e.g., from an authentication system) 
    # will be the primary key.
    id = Column(String, primary_key=True, index=True) 

    # Personal and Academic Information
    first_name = Column(String, index=True)
    last_name = Column(String)
    age = Column(Integer)
    university = Column(String)
    field_of_study = Column(String)
    # Storing semester as a string is often more flexible (e.g., "3rd Semester")
    current_semester = Column(String) 
    degree = Column(String)
    # Study Preferences
    primary_study_goals = Column(String, nullable=True)
    preferred_study_time = Column(String, nullable=True)
    
    # You could also include a column for the profile picture file path here:
    # profile_picture_url = Column(String, nullable=True)

    def __repr__(self):
        # A helpful method for debugging and logging
        return f"<Profile(id='{self.id}', name='{self.first_name} {self.last_name}')>"
    
    # Task model
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    topic = Column(String, nullable=False)
    description = Column(String, nullable=True)
    deadline = Column(String, nullable=True)  # Gelen date string olacak
    course = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Course(Base):
    __tablename__ ="courses"

    id = Column(Integer, primary_key = True, index=True) 
    course_name = Column(String, nullable=False)   #Course Topic
    project_name = Column(String, nullable=False)  #project
    deadline = Column(String, nullable=True)       #keep as simple string

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    
    def __repr__(self):
        return f"<Course(id='{self.id}', course_name='{self.course_name}')>"