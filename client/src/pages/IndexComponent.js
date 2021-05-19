import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
class IndexComponent extends React.Component {

    render() {

        return (
          <>
            <Navbar transparent />
            <main>
              <div
                className="relative pt-16 pb-32 flex content-center items-center justify-center"
                style={{
                  minHeight: "75vh",
                }}
              >
                <div
                  className="absolute top-0 w-full h-full bg-center bg-cover"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80')",
                  }}
                >
                  <span
                    id="blackOverlay"
                    className="w-full h-full absolute opacity-75 bg-black"
                  ></span>
                </div>
                <div className="container relative mx-auto">
                  <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                      <div className="pr-12">
                        <h1 className="text-white font-semibold text-5xl">
                          Clinic Management Online
                        </h1>
                        {/* <p className="mt-4 text-lg text-gray-300">
                                            ระบบจัดการ clinic ออนไลน์
                                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                  style={{ height: "70px" }}
                >
                  <svg
                    className="absolute bottom-0 overflow-hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                  >
                    <polygon
                      className="text-gray-300 fill-current"
                      points="2560 0 2560 100 0 100"
                    ></polygon>
                  </svg>
                </div>
              </div>

              <section className="pb-20 bg-gray-300 -mt-24">
                <div className="container mx-auto px-4">
                  <div className="flex flex-wrap">
                    <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                        <div className="px-4 py-5 flex-auto">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                            <i className="fas fa-award"></i>
                          </div>
                          <h6 className="text-xl font-semibold">
                            ด้านการใช้งาน
                          </h6>
                          <p className="mt-2 mb-4 text-gray-600">
                            มีความสะดวกในการใช้งานและช่วยจัดการระบบคลินิก
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-4/12 px-4 text-center">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                        <div className="px-4 py-5 flex-auto">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                            <i className="fas fa-retweet"></i>
                          </div>
                          <h6 className="text-xl font-semibold">UX/UI</h6>
                          <p className="mt-2 mb-4 text-gray-600">
                            Design ทันสมัยเหมาะกับการใช้งาน
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                        <div className="px-4 py-5 flex-auto">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                            <i className="fas fa-fingerprint"></i>
                          </div>
                          <h6 className="text-xl font-semibold">Safety</h6>
                          <p className="mt-2 mb-4 text-gray-600">
                            มีระบบความปลอดภัยสูงเพราะมี Authentication System
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center mt-32">
                    <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                      <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                        <i className="fas fa-user-friends text-xl"></i>
                      </div>
                      <h3 className="text-3xl mb-2 font-semibold leading-normal">
                        รายละเอียด
                      </h3>
                      <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                        Clinic Management เป็น web application service
                        ที่พัฒนาโดยใช้ FlaskRestFul API และ React
                      </p>
                      <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-700">
                        Backend : Flask RESTFUl , OCR
                      </p>
                      <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-700">
                        Frontend : React , Tailwind , ANT DESIGN
                      </p>
                    </div>

                    <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blue-400">
                        <img
                          alt="..."
                          src="https://images.unsplash.com/photo-1589279003513-467d320f47eb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                          className="w-full align-middle rounded-t-lg"
                        />
                        <blockquote className="relative p-8 mb-4">
                          <svg
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 583 95"
                            className="absolute left-0 w-full block"
                            style={{
                              height: "95px",
                              top: "-94px",
                            }}
                          >
                            <polygon
                              points="-30,95 583,95 583,65"
                              className="text-blue-400 fill-current"
                            ></polygon>
                          </svg>
                          <h4 className="text-xl font-bold text-white"></h4>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="relative py-20 bg-white">
                <div
                  className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                  style={{ height: "80px" }}
                >
                  <svg
                    className="absolute bottom-0 overflow-hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                  >
                    <polygon
                      className="text-white fill-current"
                      points="2560 0 2560 100 0 100"
                    ></polygon>
                  </svg>
                </div>

                <div className="container mx-auto px-4">
                  <div className="items-center flex flex-wrap">
                    <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                      <img
                        alt="..."
                        className="max-w-full rounded-lg shadow-lg"
                        src="https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
                      />
                    </div>
                    <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                      <div className="md:pr-12">
                        <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                          <i className="fas fa-rocket text-xl"></i>
                        </div>
                        <h3 className="text-3xl font-semibold">
                          Function and Service
                        </h3>
                        <p className="mt-4 text-lg leading-relaxed text-gray-600">
                          List of service
                        </p>
                        <ul className="list-none mt-6">
                          <li className="py-2">
                            <div className="flex items-center">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                  <i className="fas fa-fingerprint"></i>
                                </span>
                              </div>
                              <div>
                                <h4 className="text-gray-600">
                                  ระบบจัดการผู้ป่วย
                                </h4>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="flex items-center">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                  <i className="fab fa-html5"></i>
                                </span>
                              </div>
                              <div>
                                <h4 className="text-gray-600">
                                  ระบบจัดการพนักงาน
                                </h4>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="flex items-center">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                  <i className="far fa-paper-plane"></i>
                                </span>
                              </div>
                              <div>
                                <h4 className="text-gray-600">ระบบจัดการยา</h4>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="flex items-center">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                  <i className="far fa-paper-plane"></i>
                                </span>
                              </div>
                              <div>
                                <h4 className="text-gray-600">ระบบ Payment</h4>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="flex items-center">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                  <i className="far fa-paper-plane"></i>
                                </span>
                              </div>
                              <div>
                                <h4 className="text-gray-600">
                                  ระบบจัดการตารางคิว
                                </h4>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="flex items-center">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                  <i className="far fa-paper-plane"></i>
                                </span>
                              </div>
                              <div>
                                <h4 className="text-gray-600">
                                  ระบบสร้างใบรายงานผลตรวจ
                                </h4>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="flex items-center">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                  <i className="far fa-paper-plane"></i>
                                </span>
                              </div>
                              <div>
                                <h4 className="text-gray-600">
                                  ระบบประมวลผล Matchine Lerning As a service
                                </h4>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="pt-20 pb-48 bg-white">
                <div className="container mx-auto px-4">
                  <div className="flex flex-wrap justify-center text-center mb-24">
                    <div className="w-full lg:w-6/12 px-4">
                      <h2 className="text-4xl font-semibold">ผู้พัฒนา</h2>
                      <p className="text-lg leading-relaxed m-4 text-gray-600">
                        ทีมผู้จัดทำและพัฒนาระบบ Clinic Management
                      </p>
                      <p className="text-lg leading-relaxed m-4 text-gray-600">
                        สาขาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์
                        มหาวิทยาลัยศรีนครินทร์วิโรฒ
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-full md:w-6/12 lg:w-4/12 lg:w-12/12 mb-12 px-4">
                      <div className="px-6">
                        <img
                          alt="..."
                          src={
                            "https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.6435-9/152012876_3743999935690247_8590431754539040173_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=174925&_nc_ohc=ycSqm4yW0Q8AX_BGwK4&_nc_ht=scontent.fbkk2-7.fna&oh=8201f8e28cedd7f43d9993a1a94dbf43&oe=60CABA17"
                          }
                          className="shadow-lg rounded-full max-w-full mx-auto"
                          style={{ maxWidth: "120px" }}
                        />
                        <div className="pt-6 text-center">
                          <h5 className="text-xl font-bold">
                            Thanathip Chanasri
                          </h5>
                          <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                            Web Developer
                          </p>
                          <div className="mt-6">
                            <button
                              className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                            >
                              <i className="fab fa-twitter"></i>
                            </button>
                            <button
                              className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </button>
                            <button
                              className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                            >
                              <i className="fab fa-dribbble"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-6/12 lg:w-4/12 lg:w-12/12 mb-12 px-4">
                      <div className="px-6">
                        <img
                          alt="..."
                          src={
                            "https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.6435-9/71142190_922294111467513_7018311869760798720_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=174925&_nc_ohc=6t8yU4CTMc4AX9XgTFu&_nc_ht=scontent.fbkk2-8.fna&oh=db3839fe785900ccb0b9cc90d994a9b0&oe=60C8B8B4"
                          }
                          className="shadow-lg rounded-full max-w-full mx-auto"
                          style={{ maxWidth: "120px" }}
                        />
                        <div className="pt-6 text-center">
                          <h5 className="text-xl font-bold">
                            Kittawat Kittiparikun
                          </h5>
                          <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                            UI/UX Designer
                          </p>
                          <div className="mt-6">
                            <button
                              className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                            >
                              <i className="fab fa-google"></i>
                            </button>
                            <button
                              className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-6/12 lg:w-4/12 lg:w-12/12 mb-12 px-4">
                      <div className="px-6">
                        <img
                          alt="..."
                          src={
                            "https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.6435-9/109933654_3137082316411278_6302589288371580144_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=7O7s9ucaWW0AX9C14pX&_nc_ht=scontent.fbkk2-6.fna&oh=5f03d02c5dba50f14436d07b4396467d&oe=60CA54A8"
                          }
                          className="shadow-lg rounded-full max-w-full mx-auto"
                          style={{ maxWidth: "120px" }}
                        />
                        <div className="pt-6 text-center">
                          <h5 className="text-xl font-bold">
                            Pratthana Khuenkwawong
                          </h5>
                          <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                            UI/UX Designer
                          </p>
                          <div className="mt-6">
                            <button
                              className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                            >
                              <i className="fab fa-google"></i>
                            </button>
                            <button
                              className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                            >
                              <i className="fab fa-twitter"></i>
                            </button>
                            <button
                              className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                            >
                              <i className="fab fa-instagram"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="pb-20 relative block bg-gray-900">
                <div
                  className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                  style={{ height: "80px" }}
                >
                  <svg
                    className="absolute bottom-0 overflow-hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                  >
                    <polygon
                      className="text-gray-900 fill-current"
                      points="2560 0 2560 100 0 100"
                    ></polygon>
                  </svg>
                </div>
              </section>
            </main>
            <Footer />
          </>
        );
    }
}

export default IndexComponent