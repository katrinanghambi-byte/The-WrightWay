from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    address = Column(String)
    dob = Column(Date)
    phone = Column(String)
    income_level = Column(Float)
    risk_tolerance = Column(String)
    kyc_status = Column(String, default="pending")
    created_at = Column(DateTime, server_default=func.now())

class Account(Base):
    __tablename__ = "accounts"
    account_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    account_type = Column(String)
    balance = Column(Float, default=0.0)
    currency = Column(String, default="USD")
    status = Column(String, default="active")
    created_at = Column(Date)

class Portfolio(Base):
    __tablename__ = "portfolios"
    portfolio_id = Column(Integer, primary_key=True)
    account_id = Column(Integer, ForeignKey("accounts.account_id"))
    name = Column(String)
    strategy_id = Column(Integer)
    created_at = Column(Date)

class Security(Base):
    __tablename__ = "securities"
    security_id = Column(Integer, primary_key=True)
    ticker = Column(String, unique=True)
    name = Column(String)
    asset_type = Column(String)

class Trade(Base):
    __tablename__ = "trades"
    trade_id = Column(Integer, primary_key=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.portfolio_id"))
    security_id = Column(Integer, ForeignKey("securities.security_id"))
    trade_type = Column(String)
    quantity = Column(Float)
    price = Column(Float)
    trade_time = Column(DateTime)

class Transaction(Base):
    __tablename__ = "transactions"
    transaction_id = Column(Integer, primary_key=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.portfolio_id"))
    transaction_type = Column(String)
    amount = Column(Float)
    transaction_date = Column(Date)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    log_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    action = Column(String)
    timestamp = Column(DateTime, server_default=func.now())