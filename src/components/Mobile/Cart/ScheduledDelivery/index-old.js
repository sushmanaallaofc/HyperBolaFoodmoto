import React, { Component } from "react";
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Tabs, Tab, Box, Typography, Radio, FormControlLabel, withStyles, Chip } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import moment from "moment";
import 'react-tabs/style/react-tabs.css';
import "./ScheduledDelivery.css";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
        <Box p={3}>
            <Typography component="div">{children}</Typography>
        </Box>
        )}
      </div>
    );
}
const styles = (theme) => ({
    selected: {
      backgroundColor: '#60b246', // Add custom background color when selected
      color: '#ffffff', // Add custom text color when selected
    },
    headerButton: {
        // backgroundColor: 'your_custom_background_color',
        // color: 'your_custom_text_color',
        // borderRadius: '0px',
        // border: 'transparent',
        // padding: theme.spacing(1),
    },
    btn: {
      // Add your custom styles for the Bootstrap btn class here
    },
});

const customTheme = createTheme({
    // palette: {
    //   primary: {
    //     main: '#your_custom_color', // Background color
    //   },
    //   text: {
    //     primary: '#your_custom_color', // Text color
    //   },
    // },
});
const StyledChip = withStyles((theme) => ({
    root: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundColor: '#your_custom_color',
      color: '#your_custom_color',
      fontSize: '.95rem',
      fontWeight: 'bold',
    },
}))(Chip);

class ScheduledDelivery extends Component {
	state = {
        fullInputDate: null,
		inputDate: moment(new Date()).format("YYYY-MM-DD"),
        inputTimeSlot: "",
        todayDate: moment(new Date()).format("YYYY-MM-DD"),
        lastOrderTime: null,
        value: 0
	};

	componentDidMount() {
    this.setState({ fullInputDate: localStorage.getItem("orderScheduledDeliveryDateFull") });
		this.setState({ inputDate: localStorage.getItem("orderScheduledDeliveryDate") });
		this.setState({ inputTimeSlot: localStorage.getItem("orderScheduledDeliveryTimeSlot") });
		this.setState({ lastOrderTime: localStorage.getItem("lastOrderTime") });
        
		const { restaurant } = this.props;
        
        if(restaurant.scheduled_deliveries !== undefined) {
            // console.log(restaurant.scheduled_deliveries);
            restaurant.scheduled_deliveries.map((data, index) => {
                if(index === 0) {
                    this.setInputDate(data);
                    data.time_slots.map((slot, index) => {
                        if(index === 0) {
                            this.setInputTimeSlot(slot.title, slot.last_order_time);
                        }
                        return true;
                    });
                }
                return true;
            });
        }
	}

	setInputDate = (data) => {
		this.setState({ inputDate: data.full_date });
		localStorage.setItem("orderScheduledDeliveryDate", data.full_date);
        
        data.time_slots.map((slot, index) => {
            if(index === 0) {
                this.setInputTimeSlot(slot.title,slot.last_order_time);
            }
            return true;
        });
        localStorage.setItem("orderScheduledDeliveryDateFull", data.full_date);
	};

	setInputTimeSlot = (value,last_order_time) => {
		this.setState({ inputTimeSlot: value });
		this.setState({ lastOrderTime: last_order_time });
		localStorage.setItem("orderScheduledDeliveryTimeSlot", value);
		localStorage.setItem("lastOrderTime", last_order_time);
	};

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    handleChangeIndex = (index) => {
        this.setState({ value: index });
    };

	render() {        
		const { restaurant } = this.props;

        if(restaurant.scheduled_deliveries === undefined) {
            return (<React.Fragment></React.Fragment>);
        }

		return (
            <React.Fragment>
              <div className="p-5">
                <div
                //   className="block-content block-content-full bg-white pt-10 pb-5"
                //   style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
                >
                  <h2 className="item-text mb-10 text-uppercase">
                    {localStorage.getItem('scheduledDeliverySectionText')}
                  </h2>
                  <ThemeProvider theme={customTheme}>
                  <AppBar position="static" color="default" className="date-selection-appbar">
                    <Tabs
                      value={this.state.value}
                      onChange={this.handleChange}
                      indicatorColor="secondary"
                      textColor="secondary"
                      variant="scrollable"
                      scrollButtons="on"
                      aria-label="full width tabs"
                    >
                      {restaurant.scheduled_deliveries.map((data, index) => (
                        <Tab
                        key={data.date}
                        label={
                          moment(data.full_date).format('YYYY-MM-DD') === this.state.todayDate
                            ? 'Today'
                            : moment(data.full_date).format('YYYY-MM-DD') ===
                              moment().clone().add(1, 'days').format('YYYY-MM-DD')
                            ? 'Tomorrow'
                            : moment(data.full_date).format('ddd DD-MMM')
                        }
                        onClick={() => {
                          this.setInputDate(data);
                        }}
                        className={`${this.props.classes.headerButton} ${this.props.classes.btn}`} // Add the btn class here
                      />
                      ))}
                    </Tabs>
                  </AppBar>
                  </ThemeProvider>
                  <SwipeableViews
                    axis="x"
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                  >
                    {restaurant.scheduled_deliveries.map((data, index) => (
                      <TabPanel key={data.date} value={this.state.value} index={index} className="tab-panel">
                        {data.time_slots.map((slot) => (
                        <StyledChip
                            key={slot.id}
                            label={slot.title}
                            clickable
                            color={this.state.inputTimeSlot === slot.title ? 'secondary' : 'default'}
                            onClick={() => {
                            this.setInputTimeSlot(slot.title, slot.last_order_time);
                            }}
                        />
                        ))}
                      </TabPanel>
                    ))}
                  </SwipeableViews>
                </div>
              </div>
            </React.Fragment>
        );
	}
}

export default withStyles(styles)(ScheduledDelivery);