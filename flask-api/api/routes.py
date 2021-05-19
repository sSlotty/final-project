from flask_restful import Api

from api.OCR import OCRAPI
from api.authentication import SignUpAPI, TokenAPI, RefreshToken, getUserByIdAPI, getUserAPI

from api.patent import PatentApi, PatentApiID
from api.medicine import MedicineApi, MedicineApiID
from api.booking import BookingApi, BookingApiID, BookingIdClose, ConfIdBooking
from api.payment import PaymentApi, PaymentIdAPI
from api.report import ReportAPI, ReportIdAPI, ReportsByUserID
from api.dispense import DispenseApi, ConfDispenses, DispensesIdAPI
from api.order import OrderApi, SearchOrderByReport


def create_route(api: Api):
    # Authentication
    api.add_resource(SignUpAPI, '/authentication/signup')  # post register
    api.add_resource(TokenAPI, '/authentication/token')  # post Login
    api.add_resource(RefreshToken, '/authentication/token/refresh')  # post refresh token

    # Patent ระบบการเพิ่มผู่ป่วย
    api.add_resource(PatentApi, '/patent')  # get return all patent , post add patent
    api.add_resource(PatentApiID,
                     '/patent/id')  # get return patent  , delete remove patent ,put update patent (para patentID)

    # Medicine ระบบยา
    api.add_resource(MedicineApi, '/medicine')  # get return all medicine , post add medicine to db
    api.add_resource(MedicineApiID,
                     '/medicine/id')  # get return medicine by id , delete remove medicine , put update medicine (para medicineID)

    # Booking จัดการ ตารางการจอง
    api.add_resource(BookingApi, '/booking')  # get return all booking,post add booking
    api.add_resource(BookingApiID,
                     '/booking/id')  # get return booking by id , delete remove booking , put update booking (para bookingID)
    api.add_resource(BookingIdClose, '/booking/id/close')  # put updated booking to close
    api.add_resource(ConfIdBooking, '/booking/id/confirm')  # put confirm booking

    # staff ผู้ดูแล หมอ พญาบาล
    api.add_resource(getUserByIdAPI, '/user/id')  # get return staff by id , put updated staff by id
    api.add_resource(getUserAPI, '/user')  # return user all

    # Report รายงานประวัติผู้ป่วย
    api.add_resource(ReportAPI, '/report')  # get get all report , post add report
    api.add_resource(ReportIdAPI, '/report/id')  # get report by id do everything by reportID get update delete
    api.add_resource(ReportsByUserID, '/report/patient')
    # dispense จ่ายยา
    api.add_resource(DispenseApi, '/dispense')  # post จ่ายยาให้คนไข้ , get ดูยาที่ถ่ายไปตาม reportID #del ลบยา
    api.add_resource(ConfDispenses, '/dispense/confirm')  # post confirm การจ่ายยา
    api.add_resource(DispensesIdAPI, '/dispense/id')
    # Order
    api.add_resource(OrderApi, '/orders')  # post จ่านค่าใช้จ่ายเพิ่มเติม ,  get ดูรายละเอียดค่าใช้จ่ายตาม orderID
    api.add_resource(SearchOrderByReport, '/orders/report')  # get ดูค่าใช้จ่ายตาม reportID

    # PaymentAPI
    api.add_resource(PaymentApi, '/payments')  # get รวมใบเสร็จ get ดูใบเสร็จทั้งหมด
    api.add_resource(PaymentIdAPI, '/payments/id')  # ดูใบเสร็จตาม paymentID put confirm ใบเสร็จ

    api.add_resource(OCRAPI, '/ocr')
