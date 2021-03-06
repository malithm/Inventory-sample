import React, { lazy, useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CForm,
  CInput,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import MainChartExample from "../charts/MainChartExample.js";
import MainChartExample2 from "../charts/MainChartExample.js";
import MainChartExample3 from "../charts/MainChartExample.js";

import StockService from "../../services/StockService";

const Dashboard = () => {
  const [solarStock, setSolarStock] = useState(0);
  const [inverterStock, setInverterStock] = useState(0);
  const [dcCablesStock, setDcCablesStock] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCustomBtnSelected, setCustomBtnVisisble] = useState(false);

  const date =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate();

  const initialGraphStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate() + 1
  )
    .toISOString()
    .substr(0, 10);
  const initialGraphEndDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 1
  )
    .toISOString()
    .substr(0, 10);
const week = new Date();
week.setDate(week.getDate() - 7);
const weekFromToday = week.toISOString().substr(0, 10);

const month = new Date();
month.setDate(month.getDate() - 30);
const monthFromToday = month.toISOString().substr(0, 10);

const year = new Date();
year.setDate(year.getDate() - 365);
const yearFromToday = year.toISOString().substr(0, 10);

  const [graphsStartDate, setgraphsStartDate] = useState(weekFromToday);
  const [graphsEndDate, setgraphsEndDate] = useState(initialGraphEndDate);
  useEffect(() => {
    StockService.getCurrentStockByCategory(4).then((res) => {
      setSolarStock(numberWithCommas(res.data / 1000));
    });
    StockService.getCurrentStockByCategory(5).then((res) => {
      setInverterStock(numberWithCommas(res.data / 1000));
    });
    StockService.getCurrentStockByCategory(6).then((res) => {
      setDcCablesStock(numberWithCommas(res.data));
    });
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const resetDates = () => {
    setgraphsStartDate(initialGraphStartDate);
    setgraphsEndDate(initialGraphEndDate);
  };

  function setGraphsDates(startDate, endDate){
    setgraphsStartDate(endDate);
    setgraphsEndDate(startDate);
  }

  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" md="4">
          <CCard borderColor="danger">
            <CCardHeader color="gradient-secondary">
              Solar Modules ({date})
            </CCardHeader>
            <CCardBody>
              <h5>Stock in Inventory: {solarStock} kW</h5>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard borderColor="primary">
            <CCardHeader color="gradient-secondary">
              Inverters ({date})
            </CCardHeader>
            <CCardBody>
              <h5>Stock in Inventory: {inverterStock} kW</h5>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard borderColor="warning">
            <CCardHeader color="gradient-secondary">
              DC Cables ({date})
            </CCardHeader>
            <CCardBody>
              <h5>Stock in Inventory: {dcCablesStock} Meters</h5>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CCard borderColor="danger">
        <CCardHeader color="gradient-secondary">
          <CRow>
            <CCol xs="6">
              <h6>
                Solar Modules Stock Movement ({graphsStartDate} -{" "}
                {graphsEndDate})
              </h6>
            </CCol>
            <CCol xs="6">
              <CForm action="" method="post" inline>
              
              <CFormGroup className="pr-1"><CButton type="button" shape="pill" size="sm" color="secondary" onClick={() => setGraphsDates(initialGraphEndDate, yearFromToday)}>
                  1 Year
                </CButton></CFormGroup>
                <CFormGroup className="pr-1"><CButton type="button" shape="pill" size="sm" color="secondary" onClick={() => setGraphsDates(initialGraphEndDate, monthFromToday)}>
                  1 Month
                </CButton></CFormGroup>
                <CFormGroup className="pr-1"><CButton className="active" type="button" shape="pill" size="sm" color="secondary" onClick={() => setGraphsDates(initialGraphEndDate, weekFromToday)}>
                  1 Week
                </CButton></CFormGroup>
                <CFormGroup className="pr-1">
                  <CButton type="button" shape="pill" size="sm" color="warning" onClick={() => setCustomBtnVisisble(!isCustomBtnSelected)}>
                    Custom
                  </CButton>
                </CFormGroup>
&nbsp;
{isCustomBtnSelected ? <CRow>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputName2" className="pr-1">
                    From
                  </CLabel>
                  <CInput
                    type="date"
                    id="tdate-input"
                    name="date-input"
                    placeholder="date"
                    defaultValue={graphsStartDate}
                    onChange={(e) => setgraphsStartDate(e.target.value)}
                  />
                </CFormGroup>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputEmail2" className="pr-1">
                    To
                  </CLabel>
                  <CInput
                    type="date"
                    id="date-input"
                    name="date-input"
                    placeholder="date"
                    defaultValue={graphsEndDate}
                    onChange={(e) => setgraphsEndDate(e.target.value)}
                  />
                </CFormGroup>
                <CFormGroup className="pr-1">
                  <CButton
                    type="reset"
                    size="md"
                    color="danger"
                    onClick={() => resetDates()}
                  >
                    Reset
                  </CButton>
                </CFormGroup>
                
                </CRow> : ''}

              </CForm>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <MainChartExample
            style={{ height: "400px" }}
            startdate={graphsStartDate}
            enddate={graphsEndDate}
          />
        </CCardBody>
      </CCard>
      <CCard borderColor="primary">
        <CCardHeader color="gradient-secondary">
          <CRow>
            <CCol xs="6">
              <h6>
                Inverters Stock Movement ({graphsStartDate} - {graphsEndDate})
              </h6>
            </CCol>
            <CCol xs="6">
              <CForm action="" method="post" inline>
              
              <CFormGroup className="pr-1"><CButton type="button" shape="pill" size="sm" color="secondary" onClick={() => setGraphsDates(initialGraphEndDate, yearFromToday)}>
                  1 Year
                </CButton></CFormGroup>
                <CFormGroup className="pr-1"><CButton type="button" shape="pill" size="sm" color="secondary" onClick={() => setGraphsDates(initialGraphEndDate, monthFromToday)}>
                  1 Month
                </CButton></CFormGroup>
                <CFormGroup className="pr-1"><CButton className="active" type="button" shape="pill" size="sm" color="secondary" onClick={() => setGraphsDates(initialGraphEndDate, weekFromToday)}>
                  1 Week
                </CButton></CFormGroup>
                <CFormGroup className="pr-1">
                  <CButton type="button" shape="pill" size="sm" color="warning" onClick={() => setCustomBtnVisisble(!isCustomBtnSelected)}>
                    Custom
                  </CButton>
                </CFormGroup>
&nbsp;
{isCustomBtnSelected ? <CRow>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputName2" className="pr-1">
                    From
                  </CLabel>
                  <CInput
                    type="date"
                    id="tdate-input"
                    name="date-input"
                    placeholder="date"
                    defaultValue={graphsStartDate}
                    onChange={(e) => setgraphsStartDate(e.target.value)}
                  />
                </CFormGroup>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputEmail2" className="pr-1">
                    To
                  </CLabel>
                  <CInput
                    type="date"
                    id="date-input"
                    name="date-input"
                    placeholder="date"
                    defaultValue={graphsEndDate}
                    onChange={(e) => setgraphsEndDate(e.target.value)}
                  />
                </CFormGroup>
                <CFormGroup className="pr-1">
                  <CButton
                    type="reset"
                    size="md"
                    color="danger"
                    onClick={() => resetDates()}
                  >
                    Reset
                  </CButton>
                </CFormGroup>
                
                </CRow> : ''}

              </CForm>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <MainChartExample2
            style={{ height: "400px" }}
            startdate={graphsStartDate}
            enddate={graphsEndDate}
          />
        </CCardBody>
      </CCard>
      <CCard borderColor="warning">
        <CCardHeader color="gradient-secondary">
          <CRow>
            <CCol xs="6">
              <h6>
                DC Cables Stock Movement ({graphsStartDate} - {graphsEndDate})
              </h6>
            </CCol>
            <CCol xs="6">
              <CForm action="" method="post" inline>
              
              <CFormGroup className="pr-1"><CButton type="button" shape="pill" size="sm" color="secondary" onClick={() => setGraphsDates(initialGraphEndDate, yearFromToday)}>
                  1 Year
                </CButton></CFormGroup>
                <CFormGroup className="pr-1"><CButton type="button" shape="pill" size="sm" color="secondary" onClick={() => setGraphsDates(initialGraphEndDate, monthFromToday)}>
                  1 Month
                </CButton></CFormGroup>
                <CFormGroup className="pr-1"><CButton className="active" type="button" shape="pill" size="sm" color="secondary" onClick={() => setGraphsDates(initialGraphEndDate, weekFromToday)}>
                  1 Week
                </CButton></CFormGroup>
                <CFormGroup className="pr-1">
                  <CButton type="button" shape="pill" size="sm" color="warning" onClick={() => setCustomBtnVisisble(!isCustomBtnSelected)}>
                    Custom
                  </CButton>
                </CFormGroup>
&nbsp;
{isCustomBtnSelected ? <CRow>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputName2" className="pr-1">
                    From
                  </CLabel>
                  <CInput
                    type="date"
                    id="tdate-input"
                    name="date-input"
                    placeholder="date"
                    defaultValue={graphsStartDate}
                    onChange={(e) => setgraphsStartDate(e.target.value)}
                  />
                </CFormGroup>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputEmail2" className="pr-1">
                    To
                  </CLabel>
                  <CInput
                    type="date"
                    id="date-input"
                    name="date-input"
                    placeholder="date"
                    defaultValue={graphsEndDate}
                    onChange={(e) => setgraphsEndDate(e.target.value)}
                  />
                </CFormGroup>
                <CFormGroup className="pr-1">
                  <CButton
                    type="reset"
                    size="md"
                    color="danger"
                    onClick={() => resetDates()}
                  >
                    Reset
                  </CButton>
                </CFormGroup>
                
                </CRow> : ''}

              </CForm>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <MainChartExample3
            style={{ height: "400px" }}
            startdate={graphsStartDate}
            enddate={graphsEndDate}
          />
        </CCardBody>
      </CCard>

      {/*<WidgetsBrand withCharts/>*/}

      {/*<CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Traffic {' & '} Sales
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="info">
                        <small className="text-muted">New Clients</small>
                        <br />
                        <strong className="h4">9,123</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="danger">
                        <small className="text-muted">Recurring Clients</small>
                        <br />
                        <strong className="h4">22,643</strong>
                      </CCallout>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Monday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="34" />
                      <CProgress className="progress-xs" color="danger" value="78" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Tuesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="56" />
                      <CProgress className="progress-xs" color="danger" value="94" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Wednesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="12" />
                      <CProgress className="progress-xs" color="danger" value="67" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Thursday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="43" />
                      <CProgress className="progress-xs" color="danger" value="91" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Friday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="22" />
                      <CProgress className="progress-xs" color="danger" value="73" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Saturday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="53" />
                      <CProgress className="progress-xs" color="danger" value="82" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Sunday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="9" />
                      <CProgress className="progress-xs" color="danger" value="69" />
                    </div>
                  </div>
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                      New clients
                      &nbsp;
                      <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                      Recurring clients
                    </small>
                  </div>
                </CCol>
                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="warning">
                        <small className="text-muted">Pageviews</small>
                        <br />
                        <strong className="h4">78,623</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="success">
                        <small className="text-muted">Organic</small>
                        <br />
                        <strong className="h4">49,123</strong>
                      </CCallout>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">Male</span>
                      <span className="ml-auto font-weight-bold">43%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="warning" value="43" />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user-female" />
                      <span className="title">Female</span>
                      <span className="ml-auto font-weight-bold">37%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="warning" value="37" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-globe-alt" />
                      <span className="title">Organic Search</span>
                      <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="56" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-facebook" className="progress-group-icon" />
                      <span className="title">Facebook</span>
                      <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="15" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-twitter" className="progress-group-icon" />
                      <span className="title">Twitter</span>
                      <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="11" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-linkedin" className="progress-group-icon" />
                      <span className="title">LinkedIn</span>
                      <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="8" />
                    </div>
                  </div>
                  <div className="divider text-center">
                    <CButton color="link" size="sm" className="text-muted">
                      <CIcon name="cil-options" />
                    </CButton>
                  </div>
                </CCol>
              </CRow>
              <br />
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>User</th>
                    <th className="text-center">Country</th>
                    <th>Usage</th>
                    <th className="text-center">Payment Method</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Yiorgos Avraamu</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-us" title="us" id="us" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="success" value="50" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-mastercard" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>10 sec ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/2.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Avram Tarasios</div>
                      <div className="small text-muted">
                        <span>Recurring</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-br" title="br" id="br" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>10%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="info" value="10" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-visa" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>5 minutes ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/3.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-warning"></span>
                      </div>
                    </td>
                    <td>
                      <div>Quintin Ed</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-in" title="in" id="in" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>74%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="warning" value="74" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-stripe" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>1 hour ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/4.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-secondary"></span>
                      </div>
                    </td>
                    <td>
                      <div>Enéas Kwadwo</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-fr" title="fr" id="fr" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>98%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="danger" value="98" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-paypal" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last month</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/5.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Agapetus Tadeáš</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-es" title="es" id="es" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>22%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="info" value="22" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-google-pay"/>
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last week</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/6.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Friderik Dávid</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-pl" title="pl" id="pl" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>43%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="success" value="43" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-amex" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Yesterday</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>*/}
    </>
  );
};

export default Dashboard;
