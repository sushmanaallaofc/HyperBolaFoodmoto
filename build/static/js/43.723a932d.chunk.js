(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{480:function(e,t,a){"use strict";a.r(t);var r=a(3),l=a(4),n=a(6),c=a(5),s=a(7),o=a(0),i=a.n(o),m=a(18),g=a(57),u=a(11),d=a.n(u),y=(a(34),a(512)),_=(a(68),a(17)),E=a(93),h=a(115),p=function(e){function t(){var e,a;Object(r.a)(this,t);for(var l=arguments.length,s=new Array(l),o=0;o<l;o++)s[o]=arguments[o];return(a=Object(n.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(s)))).state={total:null,restaurants:[],loading:!1,loading_more:!0,selfpickup:!1,userPreferredSelectionDelivery:!0,userPreferredSelectionSelfPickup:!1,no_restaurants:!1,data:[],review_data:[],isHomeDelivery:!0},a.getMyFavoriteRestaurants=function(){if(localStorage.getItem("userSetAddress")){a.setState({loading:!0});var e=JSON.parse(localStorage.getItem("userSetAddress"));a.props.getFavoriteRestaurants(e.lat,e.lng).then(function(e){e&&e.payload.length?a.setState({total:e.payload.length,no_restaurants:!1,loading:!1,loading_more:!1}):a.setState({total:0,no_restaurants:!0,loading:!1,loading_more:!1})})}},a}return Object(s.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getMyFavoriteRestaurants(),"DELIVERY"===localStorage.getItem("userPreferredSelection")&&this.setState({userPreferredSelectionDelivery:!0,isHomeDelivery:!0}),"SELFPICKUP"===localStorage.getItem("userPreferredSelection")&&"true"===localStorage.getItem("enSPU")?this.setState({userPreferredSelectionSelfPickup:!0,isHomeDelivery:!1}):(localStorage.setItem("userPreferredSelection","DELIVERY"),localStorage.setItem("userSelected","DELIVERY"),this.setState({userPreferredSelectionDelivery:!0,isHomeDelivery:!0}))}},{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(h.a,{boxshadow:!0,has_title:!0,title:localStorage.getItem("favouriteStoresPageTitle"),disable_search:!0,goto_accounts_page:!0,homeButton:!0}),i.a.createElement("div",{className:"bg-white mb-100"},this.state.no_restaurants&&i.a.createElement("div",{className:"bg-light "+("true"===localStorage.getItem("enSPU")?"sticky-top":"pt-3")},i.a.createElement("div",{className:"px-15 py-3 d-flex justify-content-between align-items-center pt-100"},i.a.createElement("h1",{className:"restaurant-count mb-0 mr-2"},localStorage.getItem("noRestaurantMessage")))),this.state.loading?i.a.createElement(m.a,{height:378,width:400,speed:1.2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},i.a.createElement("rect",{x:"20",y:"20",rx:"4",ry:"4",width:"80",height:"78"}),i.a.createElement("rect",{x:"144",y:"30",rx:"0",ry:"0",width:"115",height:"18"}),i.a.createElement("rect",{x:"144",y:"60",rx:"0",ry:"0",width:"165",height:"16"}),i.a.createElement("rect",{x:"20",y:"145",rx:"4",ry:"4",width:"80",height:"78"}),i.a.createElement("rect",{x:"144",y:"155",rx:"0",ry:"0",width:"115",height:"18"}),i.a.createElement("rect",{x:"144",y:"185",rx:"0",ry:"0",width:"165",height:"16"}),i.a.createElement("rect",{x:"20",y:"270",rx:"4",ry:"4",width:"80",height:"78"}),i.a.createElement("rect",{x:"144",y:"280",rx:"0",ry:"0",width:"115",height:"18"}),i.a.createElement("rect",{x:"144",y:"310",rx:"0",ry:"0",width:"165",height:"16"})):i.a.createElement(i.a.Fragment,null,0===this.props.restaurants.length?i.a.createElement(m.a,{height:378,width:400,speed:1.2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},i.a.createElement("rect",{x:"20",y:"20",rx:"4",ry:"4",width:"80",height:"78"}),i.a.createElement("rect",{x:"144",y:"30",rx:"0",ry:"0",width:"115",height:"18"}),i.a.createElement("rect",{x:"144",y:"60",rx:"0",ry:"0",width:"165",height:"16"}),i.a.createElement("rect",{x:"20",y:"145",rx:"4",ry:"4",width:"80",height:"78"}),i.a.createElement("rect",{x:"144",y:"155",rx:"0",ry:"0",width:"115",height:"18"}),i.a.createElement("rect",{x:"144",y:"185",rx:"0",ry:"0",width:"165",height:"16"}),i.a.createElement("rect",{x:"20",y:"270",rx:"4",ry:"4",width:"80",height:"78"}),i.a.createElement("rect",{x:"144",y:"280",rx:"0",ry:"0",width:"115",height:"18"}),i.a.createElement("rect",{x:"144",y:"310",rx:"0",ry:"0",width:"165",height:"16"})):i.a.createElement("div",{className:"pt-50"},this.props.restaurants.map(function(e){return i.a.createElement(i.a.Fragment,{key:e.id},i.a.createElement("div",{className:"styles_row__1ivP1 ".concat(!e.is_active&&"restaurant-not-active"),style:{marginBottom:"6px",marginTop:"6px"}},i.a.createElement("div",{className:"styles_slide__2c207",style:{marginRight:"0px"}},i.a.createElement("div",null,i.a.createElement("div",{className:"styles_cardWithPadding__JE1QE",style:{width:"calc((100vw - 0px) - 12px)"}},i.a.createElement(g.a,{to:"../stores/"+e.slug,delay:200,className:"styles_container__fLC0R",clickAction:function(){"DELIVERY"===localStorage.getItem("userPreferredSelection")&&1===e.delivery_type&&localStorage.setItem("userSelected","DELIVERY"),"SELFPICKUP"===localStorage.getItem("userPreferredSelection")&&2===e.delivery_type&&localStorage.setItem("userSelected","SELFPICKUP"),"DELIVERY"===localStorage.getItem("userPreferredSelection")&&3===e.delivery_type&&localStorage.setItem("userSelected","DELIVERY"),"SELFPICKUP"===localStorage.getItem("userPreferredSelection")&&3===e.delivery_type&&localStorage.setItem("userSelected","SELFPICKUP")}},i.a.createElement("div",{className:"styles_imgContainer__1uHo5","aria-hidden":"true"},i.a.createElement("div",{className:"styles_ImageContainer__2rk9a styles_ImageContainerMore__2iYQz",style:{background:"rgb(251, 238, 215)"}},i.a.createElement("div",{className:"styles_Image__1fplJ ".concat(e.coupon?"rest_img":""),style:{backgroundImage:"url(".concat(e.image,")")}})),e.custom_featured_name?i.a.createElement("div",{className:"styles_imgAd__2zrjj"},e.custom_featured_name):null,e.coupon?i.a.createElement("div",{className:"OfferHeading_container__1-mOm"},i.a.createElement("div",{className:"OfferHeading_wrapper__2NaIu OfferHeading_wrapperTypeOne__26S_t"},i.a.createElement("div",{className:"OfferHeading_Header__3b4k3"},"PERCENTAGE"===e.coupon.discount_type&&e.coupon.discount+"% OFF","AMOUNT"===e.coupon.discount_type&&("left"===localStorage.getItem("currencySymbolAlign")?localStorage.getItem("currencyFormat")+e.coupon.discount+" OFF":+e.coupon.discount+localStorage.getItem("currencyFormat")+" OFF")),i.a.createElement("div",{className:"OfferHeading_SubHeader__3nmoQ"},"PERCENTAGE"===e.coupon.discount_type&&null!==e.coupon.max_discount?"left"===localStorage.getItem("currencySymbolAlign")?"Upto ".concat(localStorage.getItem("currencyFormat")).concat(parseFloat(e.coupon.max_discount).toFixed(0)):"Upto ".concat(parseFloat(e.coupon.max_discount).toFixed(0)).concat(localStorage.getItem("currencyFormat")):"left"===localStorage.getItem("currencySymbolAlign")&&e.coupon.min_subtotal>0?"Above ".concat(localStorage.getItem("currencyFormat")).concat(parseFloat(e.coupon.min_subtotal).toFixed(0)):e.coupon.min_subtotal>0?"Above ".concat(parseFloat(e.coupon.min_subtotal).toFixed(0)).concat(localStorage.getItem("currencyFormat")):null))):null),i.a.createElement("div",{className:"styles_containerRestaurant__3vhx3 styles_containerRestaurantOneAlign__1D7al"},i.a.createElement("div",{className:"styles_containerImageBadge__14fk3"},i.a.createElement("div",{className:"styles_restaurantName__29jAP"},e.name)),i.a.createElement("div",{className:"styles_restaurantMeta__2QtMf"},i.a.createElement("div",null,i.a.createElement("img",{src:"/assets/img/various/star_green.svg",alt:"rating",style:{width:"1.4rem",textAlign:"center"}}),i.a.createElement("span",{className:"styles_restaurantMetaRating__4H1gt"},"0"===e.avgRating?parseFloat(e.rating).toFixed(1):parseFloat(e.avgRating).toFixed(1)," ")),i.a.createElement("div",{style:{paddingLeft:"10px"}},i.a.createElement("span",{className:"styles_restaurantMetaDot__1AKA9"}),i.a.createElement("span",{className:"styles_restaurantMetaRating__4H1gt"},e.delivery_time," ",localStorage.getItem("homePageMinsText")))),i.a.createElement("div",{className:"styles_restaurantCuisines__3lBL4"},i.a.createElement("span",null,e.description)),i.a.createElement("div",{className:"col-12"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-9 pl-0 pr-0"},i.a.createElement("div",{className:"styles_restaurantCuisines__3lBL4"},i.a.createElement("span",null,e.address))),e.distance?i.a.createElement("div",{className:"col-3 pl-0 pr-0"},i.a.createElement("div",{className:"styles_restaurantCuisines__3lBL4"},i.a.createElement("span",{style:{paddingLeft:"2px"}}," ",parseFloat(e.distance).toFixed(1)," km"))):null)),i.a.createElement("hr",{className:"HomeRest_dottedSeparator"}),e.is_active?i.a.createElement(i.a.Fragment,null,e.free_delivery_subtotal>0?i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"styles_restaurantCuisines__3lBL4"},i.a.createElement("i",{className:"fa fa-bicycle"})," ",i.a.createElement("span",null," Free Delivery"))):i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"styles_restaurantCuisines__3lBL4"},null!==e.custom_message_on_list&&"<p><br></p>"!==e.custom_message_on_list?i.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.custom_message_on_list}}):i.a.createElement(i.a.Fragment,null,e.coupon&&e.coupon.code?i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"styles_restaurantCuisines__3lBL4",style:{display:"inline-flex"}},i.a.createElement("i",{className:"icon-Offers-outline offers-icon mr-1"})," ",i.a.createElement("span",null," ",e.coupon.code))):i.a.createElement(i.a.Fragment,null,i.a.createElement("i",{className:"si si-wallet"})," ","left"===localStorage.getItem("currencySymbolAlign")&&i.a.createElement(i.a.Fragment,null,localStorage.getItem("currencyFormat"),e.price_range," "),"right"===localStorage.getItem("currencySymbolAlign")&&i.a.createElement(i.a.Fragment,null,e.price_range,localStorage.getItem("currencyFormat")," "),i.a.createElement("span",null,localStorage.getItem("homePageForTwoText"))))))):i.a.createElement("span",{className:"restaurant-not-active-msg"},localStorage.getItem("restaurantNotActiveMsg"))),i.a.createElement(d.a,{duration:"500",hasTouch:!1})))))))}))),this.state.loading_more?i.a.createElement("div",{className:""},i.a.createElement(m.a,{height:120,width:400,speed:1.2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},i.a.createElement("rect",{x:"20",y:"20",rx:"4",ry:"4",width:"80",height:"78"}),i.a.createElement("rect",{x:"144",y:"35",rx:"0",ry:"0",width:"115",height:"18"}),i.a.createElement("rect",{x:"144",y:"65",rx:"0",ry:"0",width:"165",height:"16"}))):null))}}]),t}(o.Component);t.default=Object(y.a)(Object(_.b)(function(e){return{restaurants:e.restaurant.favoriteRestaurants}},{getDeliveryRestaurants:E.b,getSelfpickupRestaurants:E.f,getFavoriteRestaurants:E.c})(p))}}]);
//# sourceMappingURL=43.723a932d.chunk.js.map