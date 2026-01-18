from typing import Optional
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

# --- Auth Schemas ---
class UserRegister(BaseModel):
    """Schema for user registration"""
    email: EmailStr
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=6)

class UserLogin(BaseModel):
    """Schema for user login"""
    username: str
    password: str

class UserOut(BaseModel):
    """Schema for user response (without password)"""
    id: int
    email: str
    username: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str
    user: UserOut

# --- 1. ProfileBase Schema (Data for Updates) ---

# This schema defines the structure for data coming IN from the React frontend 
# when the user submits the 'Edit Profile' form (PUT/PATCH request body).
class ProfileBase(BaseModel):
    """Base schema for profile data, used for validation of incoming data."""
    
    # Use Optional for fields where the user might submit an empty value, 
    # though generally, most fields on a profile edit form should be mandatory.
    # For now, we'll assume they are all required strings/ints based on your form.

    first_name: str = Field(min_length=1)
    last_name: str = Field(min_length=1)
    # The Field validator ensures the age is positive, preventing bad data.
    age: int = Field(gt=0) 
    university: str
    field_of_study: str
    current_semester: str
    degree: str
    primary_study_goals: str
    preferred_study_time: str
    # This field is optional because it might be a text area that can be left blank.
    study_preferences_text: Optional[str] = None 

    # Configuration for Pydantic to work nicely with SQLAlchemy models
    class Config:
        # Pydantic's 'orm_mode' allows it to read data from a SQLAlchemy model 
        # (which is an ORM object) instead of just a dictionary.
        from_attributes = True 

# --- 2. ProfileCreate Schema (Used when first creating a profile) ---

# Often, ProfileCreate is the same as ProfileBase, but you might enforce additional
# fields here, or exclude the ID if the database generates it.
class ProfileCreate(ProfileBase):
    pass
    # If the user's ID is passed during creation, you might add it here, 
    # but for a simple PUT/PATCH, ProfileBase is sufficient for the body data.

# --- 3. ProfileOut Schema (Data for Responses) ---

# This schema defines the structure for data going OUT to the React frontend 
# (GET response body). It includes the ID, which the frontend needs to see, 
# but usually doesn't send back in the update body.
class ProfileOut(ProfileBase):
    """Schema for returning profile data to the client, including the primary key."""
    id: str  # The unique user ID, which is essential for the client to know
    
# We inherit all fields from ProfileBase, ensuring consistency.
#4. Task Schemas

class TaskBase(BaseModel):
    topic: str
    description: Optional[str] = None
    deadline: Optional[str] = None
    course: Optional[str] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    topic: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[str] = None
    course: Optional[str] = None


class TaskOut(TaskBase):
    id: int

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class CourseBase(BaseModel):
    course_name: str
    project_name: str
    deadline: Optional[str] = None

class CourseCreate(CourseBase):
    pass    

class CourseUpdate(BaseModel):
    course_name: Optional[str] = None
    project_name: Optional[str] = None
    deadline: Optional[str] = None

class CourseOut(CourseBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True