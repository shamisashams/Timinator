from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

# Import database components
from database import get_db, SessionLocal, engine
from models import Base, Profile
from schemas import ProfileBase, ProfileOut

# FastAPI Application Initialization
app = FastAPI(title="Timinator Profile API")

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# Creates a placeholder profile if none exists 
def get_or_create_profile(db: Session, user_id: str):
    profile = db.query(Profile).filter(Profile.id == user_id).first()
    if profile is None:
        # Create a basic placeholder profile
        new_profile = Profile(
            id=user_id,
            first_name="New",
            last_name="User",
            age=20,
            university="Not Set",
            degree = "not set",
            field_of_study="Unspecified",
            current_semester="1st Semester",
            primary_study_goals="Learn FastAPI",
            preferred_study_time="Evening",
        )
        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)
        return new_profile
    return profile

# GET Endpoint: Read Profile Data 
@app.get("/api/user/profile/{user_id}", response_model=ProfileOut)
def get_profile(user_id: str, db: Session = Depends(get_db)):
    """
    Fetches the profile for a given user ID. 
    If the profile does not exist, it creates a placeholder profile.
    """
    # handle retrieval or creation
    profile = get_or_create_profile(db, user_id)
    
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Profile for user ID {user_id} not found."
        )
    
    return profile

# PUT Endpoint: Update Profile Data 
@app.put("/api/user/profile/{user_id}", response_model=ProfileOut)
def update_profile(
    user_id: str,
    profile_data: ProfileBase, 
    db: Session = Depends(get_db)
):
    """
    Updates the entire profile for a given user ID.
    """
    # Find the existing profile
    profile = db.query(Profile).filter(Profile.id == user_id).first()

    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Profile for user ID {user_id} not found."
        )

    # 4.2 Update fields from the incoming Pydantic model
    # We iterate over the key-value pairs of the incoming data model (profile_data.dict())
    # and use the set-attribute function to update the SQLAlchemy model instance.
    update_data = profile_data.model_dump(exclude_unset=True) # Use model_dump for Pydantic V2
    for key, value in update_data.items():
        setattr(profile, key, value)

    # 4.3 Commit the changes to the database
    db.commit()
    db.refresh(profile) # Refresh the instance to get any database-generated changes

    return profile