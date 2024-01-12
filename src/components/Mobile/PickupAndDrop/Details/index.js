import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

class PickupDropDetails extends Component {
    static contextTypes = {
		router: () => null,
	};

    constructor(props) {
        super(props);
        this.state = {
          isOpenPickup: false,
          isOpenDrop: false,
          isOpenTask: false,
        };
    }
    
    togglePickupDrawer = (isOpenPickup) => () => {
        this.setState({ isOpenPickup });
    };

    toggleDropDrawer = (isOpenDrop) => () => {
        this.setState({ isOpenDrop });
    };

    toggleTaskDrawer = (isOpenTask) => () => {
        this.setState({ isOpenTask });
    };

    render() {
        return (
            <React.Fragment>
                <div style={{height: '120vh'}}>
                    <div className="pnd-detailsPageTitleSection">
                    <div className="d-flex">
                        <div onClick={() => {
                            setTimeout(() => {
                                this.context.router.history.goBack();
                            }, 200);
                        }}
                        style={{transform: 'scale(1.3)'}}><i className="si si-arrow-left" /></div>
                        <div className="d-flex justify-content-center w-100">
                        <div>Set up your task 📃</div>
                        </div>
                    </div>
                    </div>
                    <div className="mx-20" style={{marginTop: '-30px'}}>
                    <div className="d-flex justify-content-start pnd-addressSelectBtnBlock p-3 bg-white shadow-light" onClick={this.togglePickupDrawer(true)} style={{border: '2px solid rgb(20, 30, 48)'}}>
                        <div className="mr-15">
                        <div className="pnd-roundMarkNumber">1</div>
                        </div>
                        <div className="w-100">
                        <div className="font-size-h5 font-w600">Choose pickup address</div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-start pnd-addressSelectBtnBlock p-3 bg-white shadow-light mt-15" onClick={this.toggleDropDrawer(true)}>
                        <div className="mr-15">
                        <div className="pnd-roundMarkNumber">2</div>
                        </div>
                        <div className="w-100">
                        <div className="font-size-h5 font-w600">Choose drop address</div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-start pnd-addressSelectBtnBlock p-3 bg-white shadow-light mt-15" onClick={this.toggleTaskDrawer(true)}>
                        <div className="mr-15">
                        <div className="pnd-roundMarkNumber">3</div>
                        </div>
                        <div className="w-100">
                        <div className="font-size-h5 font-w600">Add task details</div>
                        </div>
                    </div>
                    </div>
                    <div className="mt-30 mx-20 mb-100" />
                </div>
                <div className="react-reveal px-20 py-15 bg-light pnd-deliveryChargesInfo" id="deliveryChargesInfo" style={{animationFillMode: 'both', animationDuration: '400ms', animationDelay: '0ms', animationIterationCount: 1, opacity: 1, animationName: 'react-reveal-324860395088107-5'}}>
                    <p className="mb-0 small">Delivery Charges</p>
                    <p className="mb-0 d-flex">Starting at&nbsp;<b>₹10 for 1 km</b><i className="si si-info text-muted ml-2 font-w300" /></p>
                </div>
                <div>
                <Drawer anchor="bottom" open={this.state.isOpenPickup} onClose={this.togglePickupDrawer(false)}>
                    <div className="pnd-drawerFixedHeader">
                        <h4 className="p-4 bg-grey font-w700">Choose address for Drop</h4>
                        <div className="pnd-addNewAddressBtn mx-15 d-flex justify-content-center align-items-center py-10 position-relative" style={{ border: "1px solid rgb(252, 128, 25)", color: "rgb(252, 128, 25)" }}>
                            <i className="si si-plus mr-2 ml-2" style={{ fontWeight: "500" }}></i>
                            <div>Add New Address</div>
                        </div>
                    </div>
                    <div className="p-3" style={{minHeight: '28rem', maxHeight: '28rem'}}>
                    <div className="pnd-addressListSingle position-relative px-10 py-5">
                        <p className="m-0 text-capitalize">Mumbai, Maharashtra, India</p>
                        <canvas height={0} width={0} style={{borderRadius: 'inherit', height: '100%', left: '0px', position: 'absolute', top: '0px', width: '100%'}} />
                        <hr />
                    </div>
                    <div className="pnd-addressListSingle position-relative px-10 py-5">
                        <p className="m-0 text-capitalize">Avadi, Tamil Nadu, India</p>
                        <canvas height={0} width={0} style={{borderRadius: 'inherit', height: '100%', left: '0px', position: 'absolute', top: '0px', width: '100%'}} />
                        <hr />
                    </div>
                    </div>
                </Drawer>
                <Drawer anchor="bottom" open={this.state.isOpenDrop} onClose={this.toggleDropDrawer(false)}>
                    <div className="pnd-drawerFixedHeader">
                        <h4 className="p-4 bg-grey font-w700">Choose address for Drop</h4>
                        <div className="pnd-addNewAddressBtn mx-15 d-flex justify-content-center align-items-center py-10 position-relative" style={{ border: "1px solid rgb(252, 128, 25)", color: "rgb(252, 128, 25)" }}>
                            <i className="si si-plus mr-2 ml-2" style={{ fontWeight: "500" }}></i>
                            <div>Add New Address</div>
                        </div>
                    </div>
                    <div className="p-3" style={{minHeight: '28rem', maxHeight: '28rem'}}>
                    <div className="pnd-addressListSingle position-relative px-10 py-5">
                        <p className="m-0 text-capitalize">Mumbai, Maharashtra, India</p>
                        <hr />
                    </div>
                    <div className="pnd-addressListSingle position-relative px-10 py-5">
                        <p className="m-0 text-capitalize">Avadi, Tamil Nadu, India</p>
                        <hr />
                    </div>
                    </div>
                </Drawer>
                <Drawer anchor="bottom" open={this.state.isOpenTask} onClose={this.toggleTaskDrawer(false)}>
                    <div className="pnd-drawerFixedHeader">
                        <h4 className="p-4 bg-grey font-w700">📦 Select Package type</h4>
                        <div className="pnd-addNewAddressBtn mx-15 d-flex justify-content-center align-items-center py-10 position-relative" style={{ border: "1px solid rgb(252, 128, 25)", color: "rgb(252, 128, 25)" }}>
                            <i className="si si-plus mr-2 ml-2" style={{ fontWeight: "500" }}></i>
                            <div>Add New Address</div>
                        </div>
                    </div>
                    <div className="p-3" style={{minHeight: '28rem', maxHeight: '28rem'}}>
                    <div className="pnd-addressListSingle position-relative px-10 py-5">
                        <p className="m-0 text-capitalize">Mumbai, Maharashtra, India</p>
                        <hr />
                    </div>
                    <div className="pnd-addressListSingle position-relative px-10 py-5">
                        <p className="m-0 text-capitalize">Avadi, Tamil Nadu, India</p>
                        <hr />
                    </div>
                    </div>
                </Drawer>
                </div>
            </React.Fragment>
        );
    }
}
export default PickupDropDetails;