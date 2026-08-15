"""
Shubh Vatika Marriage Lawn — demo API.

NO DATABASE. Sab kuch app/data.py se aata hai (in-memory).
Frontend bina backend ke bhi chalta hai — dekho frontend/src/lib/static.js

Chalane ke liye:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000
"""

from datetime import date, datetime
from pathlib import Path

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator

from app import data

app = FastAPI(title="Shubh Vatika Demo API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # demo only — production mein domain fix karna
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------- models
class Enquiry(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=10, max_length=15)
    event_date: str
    guests: int = Field(ge=25, le=2000)
    event_type: str
    message: str = Field(default="", max_length=600)

    @field_validator("phone")
    @classmethod
    def clean_phone(cls, v: str) -> str:
        digits = "".join(ch for ch in v if ch.isdigit())
        if len(digits) < 10:
            raise ValueError("Phone number needs at least 10 digits")
        return digits[-10:]

    @field_validator("event_date")
    @classmethod
    def valid_date(cls, v: str) -> str:
        try:
            datetime.strptime(v, "%Y-%m-%d")
        except ValueError:
            raise ValueError("Date must be YYYY-MM-DD")
        return v


class Estimate(BaseModel):
    package_id: str
    guests: int = Field(ge=25, le=2000)
    menu: str = "veg"  # veg | nonveg


# ---------------------------------------------------------------- routes
@app.get("/api/health")
def health():
    return {"ok": True, "db": "not connected (demo build)"}


@app.get("/api/venue")
def venue():
    return {"venue": data.VENUE, "specs": data.SPECS}


@app.get("/api/spaces")
def spaces():
    return data.SPACES


@app.get("/api/packages")
def packages():
    return {"packages": data.PACKAGES, "rows": data.COMPARISON_ROWS}


@app.get("/api/gallery")
def gallery():
    return {"items": data.GALLERY, "categories": data.GALLERY_CATS}


@app.get("/api/testimonials")
def testimonials():
    return data.TESTIMONIALS


@app.get("/api/faqs")
def faqs():
    return data.FAQS


@app.get("/api/availability")
def availability(
    year: int = Query(default=None, ge=2024, le=2035),
    month: int = Query(default=None, ge=1, le=12),
):
    today = date.today()
    return data.month_availability(year or today.year, month or today.month)


@app.post("/api/estimate")
def estimate(payload: Estimate):
    pkg = next((p for p in data.PACKAGES if p["id"] == payload.package_id), None)
    if not pkg:
        raise HTTPException(status_code=404, detail="Package not found")
    plate = pkg["plate_nonveg"] if payload.menu == "nonveg" else pkg["plate_veg"]
    catering = plate * payload.guests
    return {
        "package": pkg["id"],
        "plate_rate": plate,
        "guests": payload.guests,
        "catering": catering,
        "rental": pkg["rental"],
        "total": catering + pkg["rental"],
        "below_minimum": payload.guests < pkg["min_guests"],
        "min_guests": pkg["min_guests"],
    }


@app.post("/api/enquiry", status_code=201)
def create_enquiry(payload: Enquiry):
    if data.day_status(datetime.strptime(payload.event_date, "%Y-%m-%d").date()) == "booked":
        raise HTTPException(status_code=409, detail="That date is already booked")
    record = payload.model_dump()
    record["id"] = len(data.ENQUIRIES) + 1
    record["received_at"] = datetime.now().isoformat(timespec="seconds")
    data.ENQUIRIES.append(record)
    return {"ok": True, "id": record["id"], "received_at": record["received_at"]}


@app.get("/api/enquiry")
def list_enquiries():
    """Chhota admin-panel endpoint — pitch ke waqt dikhane ke liye."""
    return {"count": len(data.ENQUIRIES), "items": list(reversed(data.ENQUIRIES))}


# -------------------------------------------------- serve built frontend
# `cd frontend && npm run build` ke baad frontend/dist yahan se serve ho jaata hai.
DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if DIST.is_dir():
    app.mount("/assets", StaticFiles(directory=DIST / "assets"), name="assets")

    @app.get("/{full_path:path}")
    def spa(full_path: str):
        candidate = DIST / full_path
        if full_path and candidate.is_file():
            return FileResponse(candidate)
        return FileResponse(DIST / "index.html")
