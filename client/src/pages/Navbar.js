import React, { useState } from 'react'
import { useHistory, Redirect } from "react-router-dom";


export default function Navbar(props) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    let history = useHistory()

    function handleClick(path) {
        history.push(path)
    }
    



    return (
        <nav
            className={
                (props.transparent
                    ? "top-0 absolute z-50 w-full"
                    : "relative shadow-lg bg-white shadow-lg") +
                " flex flex-wrap items-center justify-between px-2 py-3 "
            }
        >
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <a type="button"
                        onClick={() => handleClick("/login")}
                        className={
                            (props.transparent
                                ? "bg-white text-gray-800 active:bg-gray-100"
                                : "bg-pink-500 text-white active:bg-pink-600") +
                            " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                        }
                        type="button"
                        style={{ transition: "all .15s ease" }}
                    >
                        <i className="fas fa-arrow-alt-circle-down"></i> Login
                    </a>
                    <a 
                        href={process.env.REACT_APP_SWAGGER_URL }
                        className={
                            (props.transparent
                                ? "bg-white text-gray-800 active:bg-gray-100"
                                : "bg-pink-500 text-white active:bg-pink-600") +
                            " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                        }
                        type="button"
                        style={{ transition: "all .15s ease" }}
                    >
                        <i className="fas fa-arrow-alt-circle-down"></i> Swagger
                    </a>

                </div>
                <div
                    className={
                        "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
                        (navbarOpen ? " block rounded shadow-lg" : " hidden")
                    }
                    id="example-navbar-warning"
                >
                </div>
            </div>
        </nav>
    )
}
