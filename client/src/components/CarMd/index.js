import React from 'react';
import "./style.css";
import repair from "./repair.png"
import maintenance from "./maintenance.png"
import safetyRecall from "./safetyRecall.png"
import warranty from "./warranty.png"
import upcomingRepairs from "./upcomingRepairs.png"


function CarMd(props) {
    return (
        <>
            <div className='vehicleInfoBox'>
                <div className='maintenanceDisplayTopInfo'>
                    <h2 className='maintenanceDisplayTitle'>{props.header}</h2>
                </div>
                <div className='vehicleBoxTopInfo'>
                    <h5 className='vehicleBoxTitle'>Purchase API Calls Here!</h5>
                </div>
                <br />
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={repair} class="d-block w-100" alt="CarMd Repair" />
                        </div>
                        <div class="carousel-item">
                            <img src={maintenance} class="d-block w-100" alt="CarMd Maintenance" />
                        </div>
                        <div class="carousel-item">
                            <img src={safetyRecall} class="d-block w-100" alt="CarMd Safety Recall" />
                        </div>
                        <div class="carousel-item">
                            <img src={warranty} class="d-block w-100" alt="CarMd Warranty" />
                        </div>
                        <div class="carousel-item">
                            <img src={upcomingRepairs} class="d-block w-100" alt="CarMd Upcoming Repairs" />
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <br />
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Payment Options
                            </button>
                            </h2>
                        </div>

                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                    <label class="form-check-label" for="defaultCheck1">
                                        One API Call - $0.50
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled />
                                    <label class="form-check-label" for="defaultCheck2">
                                        Five API Calls - $2.00
                                        </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled />
                                    <label class="form-check-label" for="defaultCheck2">
                                        Unlimited API Calls - $50.00 per year
                                </label>
                                </div>
                                <br />
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputEmail4">First Name</label>
                                            <input type="email" class="form-control" id="inputFirstName" />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="inputPassword4">Last Name</label>
                                            <input type="password" class="form-control" id="inputLastName" />
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputCity">Card Number</label>
                                            <input type="text" class="form-control" id="inputCardNumber" />
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="inputState">Expiration Date</label>
                                            <select id="inputDate" class="form-control">
                                                <option selected>Choose...</option>
                                                <option>...</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-2">
                                            <label for="inputZip">CVC</label>
                                            <input type="text" class="form-control" id="inputCVC" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="gridCheck" />
                                            <label class="form-check-label" for="gridCheck">
                                                I agree to the terms and conditions...
                                        </label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Make Payment</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarMd;