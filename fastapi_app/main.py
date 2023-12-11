from pprint import pprint
from typing import List, Union

from fastapi import FastAPI, Depends, Body, Query
from fastapi.responses import JSONResponse, FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Json
from sqlalchemy.orm import Session

from starlette.middleware.cors import CORSMiddleware

from models import User
from database import get_db

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/users")
def add_user(data=Body(), db: Session = Depends(get_db)):
    user = User(id=data['id'],
                firstname=data['firstname'],
                lastname=data['lastname'],
                email=data['email'],
                password=data['password'],
                vizits=data['vizits'],
                bonus=data['bonus'])
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.get("/users/usercheck")
def check_user_by_email(email: str, db: Session = Depends(get_db)):
    # print(email)
    user = db.query(User).filter(User.email == email).first()
    if user is not None:
        # print('user exists', user.id)
        return {
            'message': 'user exists',
            'id': user.id,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'vizits': user.vizits,
            'bonus': user.bonus
        }

    return {'message': 'user does not exist', }


@app.get("/users/password")
def password_check(email: str, passwd: str, db: Session = Depends(get_db)):
    print(email, passwd)
    user = db.query(User).filter(User.email == email).first()
    if user is not None:
        if user.password == passwd:
            return {'message': 'password matches'}
        return {'message': "password doesn't match"}
    print('user does not exist')
    return {'message': 'user does not exist', }


@app.put("/users")
def vizits_increment(data=Body(), db: Session = Depends(get_db)):
    print(data['id'])

    user = db.query(User).filter(User.id == data['id']).first()

    if user is None:
        return JSONResponse(status_code=404, content={"message": "user not found"})
    user.vizits += 1
    db.commit()
    db.refresh(user)
    return {'message': 'vizits incremented'}

@app.delete("/users")
def delete_user(id, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    u_name_him = user.firstname + ' ' + user.lastname

    if user is None:
        return JSONResponse(status_code=404, content={"message": "user not found"})
    db.delete(user)
    db.commit()
    return {'message': f'user {u_name_him} deleted from db'}

app.mount("/", StaticFiles(directory="static", html=True), name="static")

