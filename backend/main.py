from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import get_db, engine
from models import Profile, Task, Course, Base
from schemas import (
    TaskCreate, TaskUpdate, TaskOut,
    ProfileBase, ProfileOut,
    CourseCreate, CourseUpdate, CourseOut,
)


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

# Root Endpoint: Health Check

@app.get("/")
def root():
    return {"message": "Timinator backend is running!"}


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

# TASK ROUTES 

# 1  list of tasks
@app.get("/api/tasks", response_model=list[TaskOut])
def list_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks

# 2 create a new task
@app.post("/api/tasks", response_model=TaskOut)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(**task.model_dump())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

# 3 update a task
@app.put("/api/tasks/{task_id}", response_model=TaskOut)
def update_task(task_id: int, task_data: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in task_data.model_dump(exclude_unset=True).items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task

# 4 delete a task
@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"detail": "Task deleted successfully"}

#COURSE ROUTES
# list all courses
@app.get("/api/courses", response_model=list[CourseOut])
def list_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).all()
    return courses

# create a new course
@app.post("/api/courses", response_model=CourseOut)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    new_course = Course(**course.model_dump())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

# update a course
@app.put("/api/courses/{course_id}", response_model=CourseOut)
def update_course(
    course_id: int,
    course_data: CourseUpdate,
    db: Session = Depends(get_db),
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    for key, value in course_data.model_dump(exclude_unset=True).items():
        setattr(course, key, value)

    db.commit()
    db.refresh(course)
    return course

# delete a course
@app.delete("/api/courses/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(course)
    db.commit()
    return {"detail": "Course deleted successfully"}