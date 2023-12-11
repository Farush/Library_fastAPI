from sqlalchemy import Boolean, Column, Integer, String
from database import Base, engine


class User(Base):

    __tablename__ = 'users'

    id = Column(String(10), primary_key=True, index=True)
    firstname = Column(String(50), nullable=False)
    lastname = Column(String(50), nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(50), nullable=False)
    vizits = Column(Integer)
    bonus = Column(Integer)


Base.metadata.create_all(bind=engine)
