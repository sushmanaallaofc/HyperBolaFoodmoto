(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{327:function(e,t,n){"use strict";n.d(t,"b",function(){return s}),n.d(t,"a",function(){return c});var r=n(97),a=n(9),o=n(8),i=n.n(o),s=function(e,t,n,o,s){return function(c){i.a.post(a.wb,{token:e,user_id:t,delivery_lat:n,delivery_long:o,heading:s}).then(function(e){var t=e.data;return c({type:r.b,payload:t})}).catch(function(e){console.log(e)})}},c=function(e,t){return function(n){i.a.post(a.x,{token:e,order_id:t}).then(function(e){var t=e.data;return n({type:r.a,payload:t})}).catch(function(e){console.log(e)})}}},354:function(e,t,n){"use strict";var r=n(3),a=n(4),o=n(6),i=n(5),s=n(7),c=n(0),l=n.n(c),u=n(17),d=n(327),m=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(n=Object(o.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(s)))).state={gpsAccessError:!1,lat:null,lng:null},n.__sendGpsLocation=function(e){n.props.sendDeliveryGuyGpsLocation(n.props.delivery_user.data.auth_token,n.props.delivery_user.data.id,e.coords.latitude,e.coords.longitude,e.coords.heading)},n}return Object(s.a)(t,e),Object(a.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=navigator&&navigator.geolocation;t&&(this.refreshSetInterval=setInterval(function(){t.getCurrentPosition(function(t){e.__sendGpsLocation(t)},function(t){"FoodomaaAndroidWebViewUA"===navigator.userAgent&&"undefined"!==window.Android?e.setState({gpsAccessError:!1}):(console.log("Inside error"),console.log(t),e.setState({gpsAccessError:!0}))},{enableHighAccuracy:!0})},15e3))}},{key:"componentWillUnmount",value:function(){clearInterval(this.refreshSetInterval),console.log("Cleared API CALL")}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"pt-50"},this.state.gpsAccessError&&l.a.createElement("div",{className:"auth-error location-error",style:{bottom:"5rem"}},l.a.createElement("div",{className:"error-shake"},localStorage.getItem("allowLocationAccessMessage")))))}}]),t}(c.Component);t.a=Object(u.b)(function(e){return{delivery_user:e.delivery_user.delivery_user}},{sendDeliveryGuyGpsLocation:d.b})(m)},506:function(e,t,n){"use strict";n.r(t);var r=n(30),a=n.n(r),o=n(45),i=n(3),s=n(4),c=n(6),l=n(5),u=n(7),d=n(42),m=n(0),g=n.n(m),p=n(49),f=n(439),v=n(514),y=n(17),h=n(102),b=n(158),w=n(354),E=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return g.a.createElement(g.a.Fragment,null,g.a.createElement("div",{className:"content-center text-center text-muted font-w600"},g.a.createElement("div",null,g.a.createElement("i",{className:"si si-screen-smartphone mb-2",style:{fontSize:"4rem",opacity:"0.5"}})),g.a.createElement("div",null,localStorage.getItem("deliveryUsePhoneToAccessMsg"))))}}]),t}(m.Component),O=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Object(o.a)(a.a.mark(function e(){var t,n;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:document.querySelector("#mainManifest")&&document.querySelector("#mainManifest").setAttribute("href","/delivery-manifest.json"),document.getElementsByTagName("body")&&(document.getElementsByTagName("body")[0].classList.remove("bg-grey"),document.getElementsByTagName("body")[0].classList.add("delivery-dark-bg")),(t=this.props.delivery_user).success&&d.messaging.isSupported()&&(n=this.props.saveNotificationToken,h.a.requestPermission().then(Object(o.a)(a.a.mark(function e(){var r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.getToken();case 2:r=e.sent,n(r,t.data.id,t.data.auth_token);case 4:case"end":return e.stop()}},e,this)}))).catch(function(e){console.log("Unable to get permission to notify.",e)}));case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return window.innerWidth>768?g.a.createElement(E,null):this.props.delivery_user.success?g.a.createElement(g.a.Fragment,null,g.a.createElement(p.a,{seotitle:"Delivery Orders",seodescription:localStorage.getItem("seoMetaDescription"),ogtype:"website",ogtitle:localStorage.getItem("seoOgTitle"),ogdescription:localStorage.getItem("seoOgDescription"),ogurl:window.location.href,twittertitle:localStorage.getItem("seoTwitterTitle"),twitterdescription:localStorage.getItem("seoTwitterDescription")}),g.a.createElement(f.default,null),"FoodomaaAndroidWebViewUA"!==navigator.userAgent&&g.a.createElement(w.a,null)):g.a.createElement(v.a,{to:"/delivery/login"})}}]),t}(m.Component);t.default=Object(y.b)(function(e){return{delivery_user:e.delivery_user.delivery_user}},{saveNotificationToken:b.a})(O)}}]);
//# sourceMappingURL=28.ed72f654.chunk.js.map