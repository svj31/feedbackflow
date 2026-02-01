from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "sqlite:///./feedback.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

@app.get("/analytics")
def get_analytics():
    db = SessionLocal()

    total_count = db.query(Feedback).count()

    avg_rating = db.query(func.avg(Feedback.rating)).scalar()
    if avg_rating is not None:
        avg_rating = round(avg_rating, 2)

    feedback_list = db.query(Feedback).all()

    db.close()

    return {
        "total_feedback": total_count,
        "average_rating": avg_rating,
        "all_feedback": [
            {
                "id": f.id,
                "name": f.name,
                "rating": f.rating,
                "comment": f.comment,
                "created_at": f.created_at
            }
            for f in feedback_list
        ]
    }
