(global.webpackChunk_N_E=global.webpackChunk_N_E||[]).push([[53],{2041:(e,t,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/reports",function(){return n(6600)}])},8111:(e,t,n)=>{"use strict";n.d(t,{L:()=>s,N:()=>c});var r=n(4246),a=n(47),s=function(e){var t=e.title;return(0,r.jsx)("div",{className:"w-full mb-2 ",children:(0,r.jsx)("h5",{className:"font-medium w-full leading-tight text-xl mt-0 !mb-0 txt-primary",children:t})})},c=function(e){var t=e.title,n=e.extraInformations,s=e.actionButtons;return(0,r.jsxs)("div",{className:"lg:flex lg:items-center lg:justify-between mb-4",children:[(0,r.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,r.jsx)("h2",{className:"text-lg font-bold leading-7 txt-primary",children:t}),n&&(0,r.jsx)("div",{className:"mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6",children:n.map((function(e){return(0,r.jsxs)("div",{className:"mt-2 flex items-center text-sm text-gray-500",children:[e.icon?e.icon:(0,r.jsx)(a.Z,{}),e.info]})}))})]}),(0,r.jsx)("div",{className:"mt-5 flex lg:mt-0 lg:ml-4",children:s&&s.map((function(e){return(0,r.jsx)("span",{className:"sm:ml-3",children:e})}))})]})}},6600:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>C});var r=n(3842),a=n(9312),s=n(4246),c=n(189),l=n(7378);const i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M732 120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v148h440V120zm120 212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM664 844H360V568h304v276zm164-360c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-40c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v40z"}}]},name:"printer",theme:"filled"};var u=n(2644),o=function(e,t){return l.createElement(u.Z,(0,c.Z)((0,c.Z)({},e),{},{ref:t,icon:i}))};o.displayName="PrinterFilled";const d=l.forwardRef(o);var m=n(3027),f=n(6178),h=n(6591),y=n(1320),p=n.n(y),g=n(6677),x=n(8111),v=n(2166),Z=n(4830),j=m.Z.Column,_=m.Z.ColumnGroup;const C=function(){var e=(0,g.useRouter)(),t=(0,l.useState)(!1),n=t[0],c=t[1],i=(0,l.useState)(!1),u=(i[0],i[1]),o=(0,l.useState)([]),y=o[0],C=o[1],w=function(){var e=(0,r.Z)((function(){var e,t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),u(!1),c(!0),[4,(0,v.Bj)()];case 1:return(e=n.sent())&&(C(e),c(!1)),[3,3];case 2:return t=n.sent(),console.log(t),u(!0),c(!1),[3,3];case 3:return[2]}}))}));return function(){return e.apply(this,arguments)}}();return(0,l.useEffect)((function(){w()}),[]),(0,s.jsxs)("div",{className:"mx-8 my-4 bg-white h-full px-8 py-4",children:[(0,s.jsx)(x.N,{title:"Recent Payments"}),(0,s.jsxs)(m.Z,{rowKey:"id",className:"pt-4",pagination:{pageSize:10},rowClassName:"group",loading:n,bordered:!0,size:"xs",dataSource:y,children:[(0,s.jsx)(j,{title:"Payment No",dataIndex:"id",render:function(e){return(0,s.jsxs)(s.Fragment,{children:[(0,Z.O)(e)," "]})}},"id"),(0,s.jsx)(j,{title:"Title",dataIndex:"title"},"title"),(0,s.jsxs)(_,{title:"Student",children:[(0,s.jsx)(j,{title:"ID",dataIndex:"student",render:function(e){return(0,s.jsx)(s.Fragment,{children:e.collageId})}},"studentId"),(0,s.jsx)(j,{title:"Name",dataIndex:"student",render:function(e){return(0,s.jsx)(s.Fragment,{children:e.name})}},"studentName")]}),(0,s.jsx)(j,{title:"Attachment No",dataIndex:"attachmentNo"},"attachmentNo"),(0,s.jsx)(j,{title:"Payment way",dataIndex:"paymentWay"},"paymentWay"),(0,s.jsx)(j,{title:"Total payment",dataIndex:"total"},"total"),(0,s.jsx)(j,{title:"Saved at",dataIndex:"createdAT",render:function(e){return(0,s.jsxs)(s.Fragment,{children:[" ",p()(e).format("D/MM/YYYY")," "]})}},"createdAT"),(0,s.jsx)(j,{title:"Actions",dataIndex:"id",render:function(t){return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(f.Z,{title:"Print",children:(0,s.jsx)(h.Z,{type:"default",onClick:function(n){return function(t){var n="/print/".concat(t);e.push(n)}(t)},shape:"circle",icon:(0,s.jsx)(d,{})})})})}},"id")]},"id")]})}},2166:(e,t,n)=>{"use strict";n.d(t,{BS:()=>y,Bj:()=>h,DR:()=>i,Fx:()=>m,cT:()=>u,pd:()=>f,r$:()=>d,yw:()=>o});var r=n(3842),a=n(9312),s=n(1072),c=n(8625),l=n(5396),i=(function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,c.Z.sendSync(s.j4.checkAndInitializePaymentTypesCall)];case 1:return e=t.sent(),[2,(0,l.Z)(e)];case 2:return[2,t.sent()];case 3:return[2]}}))}))}(),function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return[4,c.Z.sendSync(s.j4.fetchPaymentTypesCall)];case 1:return e=t.sent(),[2,(0,l.Z)(e)]}}))}));return function(){return e.apply(this,arguments)}}()),u=function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return[4,c.Z.sendSync(s.j4.fetchPaymentFormDataCall)];case 1:return e=t.sent(),[2,(0,l.Z)(e)]}}))}));return function(){return e.apply(this,arguments)}}(),o=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,c.Z.sendSync(s.j4.changePaymentTypeStatusCall,e)];case 1:return t=n.sent(),[2,(0,l.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}(),d=(function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,c.Z.sendSync(s.j4.createPaymentTypeCall,JSON.stringify(e))];case 1:return t=n.sent(),[2,(0,l.Z)(t)]}}))}))}(),function(){var e=(0,r.Z)((function(){var e,t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return"Test payment",1,"attachment","null",1e3,e={title:"Test payment",studentId:1,attachmentNo:"attachment",checkNo:"null",total:1e3,payments:[{paymentId:1,paymentTypeId:1,price:1e3,month:2,year:2020}]},[4,c.Z.sendSync(s.j4.addPaymentCall,e)];case 1:return t=n.sent(),console.log("**********************",t),[2,(0,l.Z)(t)]}}))}))}(),function(){var e=(0,r.Z)((function(){return(0,a.__generator)(this,(function(e){switch(e.label){case 0:return[4,c.Z.sendSync(s.j4.fetchPaymentFormsCall)];case 1:return[2,e.sent()]}}))}))}(),function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,c.Z.sendSync(s.j4.createPaymentFormCall,e)];case 1:return t=n.sent(),[2,(0,l.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}()),m=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,c.Z.sendSync(s.j4.changePaymentFormStateCall,e)];case 1:return t=n.sent(),[2,(0,l.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}(),f=(function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,c.Z.sendSync(s.j4.fetchPaymentFormsForDepartementCall,e)];case 1:return t=n.sent(),[2,(0,l.Z)(t)]}}))}))}(),function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,c.Z.sendSync(s.j4.savePaymentCall,e)];case 1:return t=n.sent(),[2,(0,l.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}()),h=function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return[4,c.Z.sendSync(s.j4.fetchPaymentsCall)];case 1:return e=t.sent(),[2,(0,l.Z)(e)]}}))}));return function(){return e.apply(this,arguments)}}(),y=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,c.Z.sendSync(s.j4.getPaymentDetailsCall,e)];case 1:return t=n.sent(),[2,(0,l.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}()},1072:(e,t,n)=>{"use strict";n.d(t,{N5:()=>a,ay:()=>s,j4:()=>r});var r={fetchPaymentTypesCall:"get-all-payment-types",createPaymentTypeCall:"create-payment-type",checkAndInitializePaymentTypesCall:"check-and-initialize-payment-types",changePaymentTypeStatusCall:"change-payment-type-status",addPaymentCall:"add-payment-call",fetchPaymentFormsCall:"get-all-payment-forms",createPaymentFormCall:"create-payment-form",fetchPaymentFormDataCall:"get-payment-form-data",changePaymentFormStateCall:"change-payment-form-status",fetchPaymentFormsForDepartementCall:"fetch-payment-forms-for-departement",savePaymentCall:"save-payment",fetchPaymentsCall:"get-all-payments",getPaymentDetailsCall:"get-payment-details"},a={getAllDepartementsCall:"get-all-departements",createDepartementCall:"create-departement",deleteDepartementCall:"delete-departement"},s={getAllStudentsCall:"get-all-students",createStudentCall:"create-student",deleteStudentCall:"delete-student",getStudentsWithLessData:"get-students-with-less-data",searchStudentsById:"search-students-by-id",getStudentPaymentFormInformation:"get-student-payment-form-information"}},8625:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});const r=require("electron");const a=n.n(r)().ipcRenderer||!1},5396:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=function(e){try{var t=JSON.parse(e);return console.log("%c Success response:","color:white; background: green",t),t}catch(n){throw console.log("%c Error response: ","color:white; background:red",e),n}}},4830:(e,t,n)=>{"use strict";n.d(t,{O:()=>r});var r=function(e){return"NA"+String(e).padStart(6,"0")}},6677:(e,t,n)=>{e.exports=n(5817)},7282:e=>{"use strict";e.exports=require("process")}},e=>{e.O(0,[259,47,831,774,888,179],(()=>{return t=2041,e(e.s=t);var t}));var t=e.O();_N_E=t}]);