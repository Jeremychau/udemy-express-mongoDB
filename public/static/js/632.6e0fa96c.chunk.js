"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[632],{3373:function(e,n,r){r.d(n,{Z:function(){return a}});r(2791);var t=r(184),a=function(e){return(0,t.jsx)("div",{className:"card ".concat(e.className?e.className:""),style:e.style,children:e.children})}},5434:function(e,n,r){r(2791);var t=r(4575),a=r(6517),s=r(184);n.Z=function(e){return(0,s.jsx)(t.Z,{onCancel:e.onClear,header:"An Error Occurred!",show:!!e.error,footer:(0,s.jsx)(a.Z,{onClick:e.onClear,children:"Okay"}),children:(0,s.jsx)("p",{children:e.error})})}},4575:function(e,n,r){r.d(n,{Z:function(){return u}});var t=r(1413),a=r(2791),s=r(4164),c=r(4595),o=r(9422),i=r(184),l=function(e){var n=(0,i.jsxs)("div",{className:"modal ".concat(e.className),style:e.style,children:[(0,i.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:(0,i.jsx)("h2",{children:e.header})}),(0,i.jsx)("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault},children:(0,i.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children})}),(0,i.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]});return s.createPortal(n,document.getElementById("modal-hook"))},u=function(e){return(0,i.jsxs)(a.Fragment,{children:[e.show&&(0,i.jsx)(o.Z,{onClick:e.onCancel}),(0,i.jsx)(c.Z,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal",children:(0,i.jsx)(l,(0,t.Z)({},e))})]})}},5887:function(e,n,r){r.d(n,{x:function(){return m}});var t=r(5861),a=r(885),s=r(7757),c=r.n(s),o=r(2791),i=r(4569),l=r.n(i),u=JSON.parse(localStorage.getItem("userData")),d=l().create({baseURL:"https://udemy-production-mern.herokuapp.com/api/"});d.defaults.headers.common.Authorization=u?"Bearer ".concat(u.token):"",l().defaults.headers.post["Content-Type"]="application/json";var h=d,m=function(){var e=(0,o.useState)(!1),n=(0,a.Z)(e,2),r=n[0],s=n[1],i=(0,o.useState)(null),l=(0,a.Z)(i,2),u=l[0],d=l[1],m=(0,o.useCallback)(function(){var e=(0,t.Z)(c().mark((function e(n){var r,t,a,o=arguments;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=o.length>1&&void 0!==o[1]?o[1]:"get",t=o.length>2&&void 0!==o[2]?o[2]:null,s(!0),e.prev=3,e.next=6,h[r](n,t);case 6:if(a=e.sent){e.next=9;break}throw new Error(a.message);case 9:return s(!1),e.abrupt("return",a.data);case 13:throw e.prev=13,e.t0=e.catch(3),d(e.t0.message||"Something Error"),s(!1),e.t0;case 18:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(n){return e.apply(this,arguments)}}(),[]);return{isLoading:r,error:u,setError:d,sendReq:m,clearError:function(){d(null)}}}},1632:function(e,n,r){r.r(n),r.d(n,{default:function(){return j}});var t=r(5861),a=r(885),s=r(7757),c=r.n(s),o=r(2791),i=r(1523),l=r(184),u=function(e){return(0,l.jsx)("div",{className:"avatar ".concat(e.className),style:e.style,children:(0,l.jsx)("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}})})},d=r(3373),h=function(e){return(0,l.jsx)("li",{className:"user-item",children:(0,l.jsx)(d.Z,{className:"user-item__content",children:(0,l.jsxs)(i.rU,{to:"/".concat(e.user._id,"/places"),children:[(0,l.jsx)("div",{className:"user-item__image",children:(0,l.jsx)(u,{image:"".concat("https://udemy-production-mern.herokuapp.com/"+e.image),alt:e.name})}),(0,l.jsxs)("div",{className:"user-item__info",children:[(0,l.jsx)("h2",{children:e.name}),(0,l.jsxs)("h3",{children:[e.placeCount," ",1===e.placeCount?"Place":"Places"," "]})]})]})})})},m=function(e){return 0===e.items.length?(0,l.jsx)("div",{className:"center",children:(0,l.jsx)("h2",{children:"No Users Found."})}):(0,l.jsx)(d.Z,{children:(0,l.jsx)("ul",{className:"users-list",children:e.items.map((function(e,n){return(0,l.jsx)(h,{user:e,id:e.id,image:e.image,name:e.name,placeCount:e.places.length},n)}))})})},f=r(5434),x=r(9895),p=r(5887),j=function(){var e=(0,o.useState)([]),n=(0,a.Z)(e,2),r=n[0],s=n[1],i=(0,p.x)(),u=i.isLoading,d=i.error,h=i.setError,j=i.sendReq;return(0,o.useEffect)((function(){var e=function(){var e=(0,t.Z)(c().mark((function e(){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j("/users","get","");case 3:n=e.sent,s(n),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),h(e.t0.message||"Something Error");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,l.jsxs)(o.Fragment,{children:[(0,l.jsx)(f.Z,{error:d,onClear:function(){return h(null)}}),u&&(0,l.jsx)("div",{className:"center",children:(0,l.jsx)(x.Z,{})}),!u&&r&&(0,l.jsx)(m,{items:r})]})}}}]);
//# sourceMappingURL=632.6e0fa96c.chunk.js.map