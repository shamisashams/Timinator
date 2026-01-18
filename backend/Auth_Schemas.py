from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    """Schema for user registration"""
    email: EmailStr
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=6)


class UserLogin(BaseModel):
    """Schema for user login"""
    username: str
    password: str


class Token(BaseModel):
    """Schema for token response"""
    access_token: str
    token_type: str
    user_id: str
    username: str


class UserOut(BaseModel):
    """Schema for user output"""
    id: int
    email: str
    username: str
    
    class Config:
        from_attributes = True